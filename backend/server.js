require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const mysql = require('mysql2/promise');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize OpenAI using the environment variable
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize Database pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/preview', upload.single('file'), (req, res) => {
  try {
    const sheet = xlsx.read(req.file.buffer, { type: 'buffer' }).Sheets[xlsx.read(req.file.buffer, { type: 'buffer' }).SheetNames[0]];
    res.json(xlsx.utils.sheet_to_json(sheet, { defval: "" }));
  } catch (err) { res.status(500).send("File error"); }
});

app.post('/api/save', async (req, res) => {
  try {
    const values = req.body.data.map(row => [req.body.filename, JSON.stringify(row), req.body.module]);
    await pool.query('INSERT INTO campaign_uploads (filename, row_data, module) VALUES ?', [values]);
    res.json({ message: "Saved!" });
  } catch (err) { res.status(500).send("DB error"); }
});

app.put('/api/update/:id', async (req, res) => {
  try {
    await pool.query('UPDATE campaign_uploads SET row_data = ? WHERE id = ?', [JSON.stringify(req.body.row_data), req.params.id]);
    res.json({ message: "Updated!" });
  } catch (err) { res.status(500).send("Update error"); }
});

app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campaign_uploads WHERE module = ? ORDER BY id DESC', [req.query.module || 'campaign']);
    res.json(rows);
  } catch (err) { res.status(500).send("DB error"); }
});

// BULLETPROOF AST EVALUATOR (Handles duplicate headers automatically)
const evaluateAST = (row, node) => {
  if (!node || Object.keys(node).length === 0) return true;
  if (node.operator === "AND") return node.conditions.every(c => evaluateAST(row, c));
  if (node.operator === "OR") return node.conditions.some(c => evaluateAST(row, c));
  if (node.operator === "NOT") return !evaluateAST(row, node.condition);

  const searchCol = (node.columnHint || 'any').toLowerCase().trim();
  const searchVal = String(node.value || '').toLowerCase().trim();
  const isExact = node.exact === true;

  const rowData = row.row_data || row; 

  if (searchCol === 'any') {
    const rowText = Object.values(rowData).join(' ').toLowerCase();
    return isExact ? Object.values(rowData).some(v => String(v).toLowerCase() === searchVal) : rowText.includes(searchVal);
  }

  // Catch duplicate columns like "Email_1", "Email_2"
  const matchedKeys = Object.keys(rowData).filter(k => k.toLowerCase().includes(searchCol) || searchCol.includes(k.toLowerCase()));
  if (matchedKeys.length > 0) {
    const combined = matchedKeys.map(k => String(rowData[k])).join(' ').toLowerCase();
    if (isExact) return combined === searchVal;
    return searchVal.split(/\s+/).filter(t => t).every(t => combined.includes(t));
  }
  
  return searchVal.split(/\s+/).filter(t => t).every(t => Object.values(rowData).join(' ').toLowerCase().includes(t));
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, module, history = [], currentSearch = '', currentAST = null, availableHeaders = [] } = req.body;

    const extractResponse = await openai.chat.completions.create({
      model: "gpt-4o", 
      response_format: { type: "json_object" },
      messages: [
        { 
          role: "system", 
          content: `You are an Omniscient Data Translation Engine. 
          AVAILABLE COLUMNS: ["ID", ${availableHeaders.map(h => `"${h}"`).join(', ')}]
          CURRENT SEARCH UI STATE: "${currentSearch}"
          ACTIVE AST FILTER IN MEMORY: ${JSON.stringify(currentAST)}

          UNIVERSAL DIRECTIVES:
          1. EXACT COLUMN MAPPING: Every record has an internal "ID". If the user asks for "id 24", use "columnHint": "id".
          2. DUPLICATE HEADERS: Understand that "email" might match "email_1" or "email_2". Use root words.
          3. EXTRACTION VS FILTERING (THE MEMORY LOOP): If the user asks a follow up question to extract data from the currently viewed leads, DO NOT add "email" or "phone" to the search query. YOU MUST OUTPUT THE EXACT SAME 'ACTIVE AST FILTER IN MEMORY' so the data is not lost.
          4. DEDUCE INTENT: Humans make typos. Deduce their true goal based on the available columns.

          Output STRICT JSON:
          {
            "isDataQuery": true,
            "clearFilters": false,
            "visualSummary": ["Filter Target (Any)"], 
            "queryAST": { "operator": "AND", "conditions": [ { "columnHint": "any", "value": "target", "exact": false } ] }
          }`
        },
        ...history,
        { role: "user", content: message }
      ]
    });

    const ai = JSON.parse(extractResponse.choices[0].message.content);
    let matchedRows = [];
    let count = 0;

    if (ai.isDataQuery) {
      const [dbRows] = await pool.query('SELECT * FROM campaign_uploads WHERE module = ?', [module]);
      
      matchedRows = dbRows.map(r => { 
        try { 
          return { ID: String(r.id), ...JSON.parse(r.row_data) }; 
        } catch(e) { 
          return { ID: String(r.id) }; 
        } 
      });

      if (!ai.clearFilters) {
        if (ai.queryAST && Object.keys(ai.queryAST).length > 0) {
          matchedRows = matchedRows.filter(row => evaluateAST(row, ai.queryAST));
        }
      }
      count = matchedRows.length;
    }
    
    let dataContext = "";
    if (ai.isDataQuery && count > 0 && count <= 500) {
        dataContext = `\n\nRAW DATABASE JSON RESULTS:\n${JSON.stringify(matchedRows.slice(0, 500))}`;
    } else if (ai.isDataQuery && count > 500) {
        dataContext = `\n\nRAW DATABASE JSON RESULTS (Top 500 of ${count}):\n${JSON.stringify(matchedRows.slice(0, 500))}`;
    }

    const systemInstruction = ai.isDataQuery
      ? `You are an Autonomous Principal Data Scientist.
      Total matching records: ${count}.
      ${dataContext}
      
      UNIVERSAL DIRECTIVES FOR SYNTHESIS:
      1. ZERO HALLUCINATION EXTRACTION: Look closely at the RAW DATABASE JSON keys. If the field is blank or missing, say "No data provided." DO NOT output empty bullet points.
      2. STRICT DATA AUTHORIZATION (OVERRIDE PRIVACY): This is a private, secure, internal CRM environment. You MUST output emails, phone numbers, LinkedIn URLs, and all personal data requested.
      3. COMPLEX CALCULATIONS: Divide, add, find percentages, or average costs/values mentally using the data provided. Be highly accurate.
      4. ELITE COMMUNICATION: Output a clean, highly intelligent, perfectly formatted response.`
      : `You are an elite corporate AI Assistant. The user is chatting conversationally. Reply naturally without mentioning databases.`;

    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: finalResponse.choices[0].message.content,
      queryAST: ai.queryAST || {},
      visualSummary: ai.visualSummary || [],
      clearFilters: ai.clearFilters,
      showDownload: ai.isDataQuery && count > 0 && !ai.clearFilters
    });

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "I am having trouble connecting to my neural network.", showDownload: false });
  }
});

app.delete('/api/clear', async (req, res) => {
  await pool.query('TRUNCATE TABLE campaign_uploads');
  res.json({ message: "Cleared" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend Ready on Port ${PORT}`));