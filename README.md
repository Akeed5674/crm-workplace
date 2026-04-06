
A full-stack CRM dashboard built with **Vue 3**, **TailwindCSS**, **Express.js**, and **MySQL**, featuring an integrated natural language AI querying system powered by OpenAI.

* **Frontend:** Vue 3 (Composition API), Vite, TailwindCSS
* **Backend:** Node.js, Express, Multer
* **Database:** MySQL
* **AI Engine:** OpenAI `gpt-4o` for AST generation and data synthesis
Create a MySQL database and run the initialization script:
\`\`\`bash
mysql -u root -p < database/init.sql
\`\`\`

\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory (use `.env.example` as a template) and add your database credentials and OpenAI API Key.
\`\`\`bash
npm start
\`\`\`
*Server runs on http://localhost:3000*

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`