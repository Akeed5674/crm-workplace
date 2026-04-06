<template>
  <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-200 selection:text-blue-900 relative">
    
    <aside class="w-64 bg-[#0B1120] text-slate-400 flex flex-col shadow-2xl z-20 shrink-0 border-r border-slate-800 overflow-y-auto">
      <div class="p-6 border-b border-slate-800/60 text-center sticky top-0 bg-[#0B1120] z-10">
        <h1 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 uppercase tracking-tighter drop-shadow-sm">CRM</h1>
        <p class="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-[0.2em]">Workspace</p>
      </div>
      
      <nav class="flex-1 p-4 flex flex-col gap-2">
        <div class="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2 mb-1 px-2">Core Teams</div>
        <button @click="switchModule('campaign')" :class="activeModule === 'campaign' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg> Campaign
        </button>
        <button @click="switchModule('drt')" :class="activeModule === 'drt' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> DRT
        </button>
        <button @click="switchModule('bd')" :class="activeModule === 'bd' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Business Dev
        </button>
        <button @click="switchModule('eitn')" :class="activeModule === 'eitn' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> EITN
        </button>

        <div class="mt-4 mb-1 px-2">
          <button @click="isSalesMenuOpen = !isSalesMenuOpen" class="w-full flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors">
            Sales Division
            <svg :class="isSalesMenuOpen ? 'rotate-180' : ''" class="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
        
        <div v-show="isSalesMenuOpen" class="flex flex-col gap-2 pl-2 ml-2 border-l border-slate-800/80 transition-all duration-300">
          <button @click="switchModule('sales_contacts')" :class="activeModule === 'sales_contacts' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-left text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Contacts
          </button>
          <button @click="switchModule('sales_opportunities')" :class="activeModule === 'sales_opportunities' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg font-bold' : 'hover:bg-slate-800/50 hover:text-slate-200'" class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-left text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Opportunities
          </button>
        </div>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
      <header class="bg-white/80 backdrop-blur-md px-5 py-3 shadow-sm border-b border-slate-200/60 flex justify-between items-center z-10 shrink-0">
        <h2 class="text-lg font-extrabold text-slate-800 tracking-tight uppercase">{{ activeModule.replace('_', ' ') }} Data</h2>
      </header>

      <div class="p-3 flex-1 w-full flex flex-col gap-3 overflow-hidden">
        
        <div v-show="currentTab === 'preview'" class="bg-white rounded-xl border border-slate-200/60 px-4 py-3 shadow-sm flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 class="text-sm font-bold text-slate-800 tracking-tight">Sync Excel/CSV File</h2>
            <p class="text-slate-500 text-[10px] mt-0.5">Preview data securely before saving to the database.</p>
          </div>
          <div class="flex gap-4 items-center">
            <label class="relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/50 px-4 py-2 text-xs font-semibold text-blue-600 transition-all hover:bg-blue-50">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              <span class="max-w-[150px] truncate">{{ file ? file.name : 'Choose File' }}</span>
              <input type="file" accept=".xlsx, .xls, .csv" @change="handleFileSelect" ref="fileInput" class="hidden" />
            </label>

            <button @click="upload" :disabled="!file || loading" class="group relative inline-flex h-9 w-32 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-black text-white shadow-lg disabled:opacity-50 hover:scale-[1.02]">
              <span class="transition-all tracking-wide">SAVE TO DB</span>
            </button>
          </div>
        </div>

        <div v-if="currentTab === 'preview' && activeModule === 'eitn'" class="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm shrink-0 transition-shadow hover:shadow-md">
          <div class="mb-2 flex items-center justify-between">
            <h2 class="text-xs font-bold text-slate-800 tracking-tight">Add Individual EITN Lead</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 items-center">
            <input v-model="eitnForm['First name']" placeholder="First Name" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['Last name']" placeholder="Last Name" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['Job title']" placeholder="Job Title" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['Company name']" placeholder="Company Name" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['Email']" placeholder="Email Address" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['Mob number']" placeholder="Mob Number" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-500" />
            <input v-model="eitnForm['PR or Integrated comms or Tech Brand']" placeholder="PR / Comms / Tech Brand" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none lg:col-span-2" />
            <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-md px-2 lg:col-span-2 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500">
              <label class="text-[9px] font-bold text-slate-400 uppercase w-10 text-center leading-tight">Date</label>
              <input v-model="eitnForm['First contact date']" type="date" class="bg-transparent flex-1 py-1.5 text-[11px] outline-none text-slate-700" />
            </div>
            <input v-model="eitnForm['Reason']" placeholder="Reason" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none lg:col-span-2" />
            <select v-model="eitnForm['Interest level']" class="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none lg:col-span-1">
              <option value="1">Lvl 1</option><option value="2">Lvl 2</option><option value="3">Lvl 3</option><option value="4">Lvl 4</option><option value="5">Lvl 5</option>
            </select>
            <div class="flex gap-2 lg:col-span-3 items-center">
              <input v-model="eitnForm['Follow up?']" placeholder="Follow up?" class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none" />
              <button @click="submitManualEntry" :disabled="loading" class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md shadow-sm hover:scale-105">+</button>
            </div>
          </div>
        </div>

        <div v-else-if="currentTab === 'preview' && activeModule === 'sales_contacts'" class="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm shrink-0">
          <h2 class="text-xs font-bold text-slate-800 mb-2">Add Sales Contact</h2>
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 items-center">
            <input v-model="salesContactsForm['First Name']" placeholder="First Name" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Last Name']" placeholder="Last Name" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Current Job Title']" placeholder="Job Title" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Primary Email']" placeholder="Email" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Contact Number']" placeholder="Phone Number" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Country']" placeholder="Country" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Region']" placeholder="Region" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500" />
            <input v-model="salesContactsForm['Linked Urls']" placeholder="LinkedIn URL" class="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-emerald-500 lg:col-span-2" />
            <div class="flex gap-2 lg:col-span-1">
              <input v-model="salesContactsForm['Assigned To']" placeholder="Assigned To" class="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-[11px] outline-none" />
              <button @click="submitManualEntry" :disabled="loading" class="w-8 h-8 bg-emerald-500 text-white rounded font-black hover:scale-105">+</button>
            </div>
          </div>
        </div>

        <div v-else-if="currentTab === 'preview' && activeModule === 'sales_opportunities'" class="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm shrink-0">
          <h2 class="text-xs font-bold text-slate-800 mb-2">Add Sales Opportunity</h2>
          <div class="grid grid-cols-2 lg:grid-cols-6 gap-2 items-center">
            <input v-model="salesOppsForm['Opportunity Name']" placeholder="Opportunity Name" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Organization']" placeholder="Organization" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Client']" placeholder="Client" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Contact Name']" placeholder="Contact Name" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            
            <select v-model="salesOppsForm['Sales Stage']" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-600">
              <option value="" disabled selected>Select Stage...</option>
              <option value="Closed Lost">Closed Lost</option><option value="Rejected">Rejected</option><option value="Closed Won">Closed Won</option>
              <option value="Proposal Sent">Proposal Sent</option><option value="Replied">Replied</option><option value="Meeting">Meeting</option>
            </select>
            
            <select v-model="salesOppsForm['Type']" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-600">
              <option value="" disabled selected>Select Type...</option>
              <option value="New Business">New Business</option><option value="Existing Business">Existing Business</option>
            </select>

            <select v-model="salesOppsForm['Campaign Type']" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none text-slate-600">
              <option value="" disabled selected>Campaign Type...</option>
              <option value="MQL">MQL</option><option value="BANT">BANT</option><option value="HQL">HQL</option>
              <option value="Event Registration">Event Registration</option><option value="Registration">Registration</option><option value="Display Campaign">Display Campaign</option>
            </select>

            <input v-model="salesOppsForm['Description']" placeholder="Description" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none lg:col-span-2" />
            <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1"><label class="text-[8px] text-slate-400 font-bold ml-1">START</label><input v-model="salesOppsForm['Start Date']" type="date" class="bg-transparent flex-1 py-1 text-[10px] outline-none" /></div>
            <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1"><label class="text-[8px] text-slate-400 font-bold ml-1">CLOSE</label><input v-model="salesOppsForm['Expected Close Date']" type="date" class="bg-transparent flex-1 py-1 text-[10px] outline-none" /></div>
            <input v-model="salesOppsForm['Total Leads']" type="number" placeholder="Total Leads" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['CPL']" placeholder="CPL" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Total Cost of Project']" placeholder="Total Cost" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Target Geography']" placeholder="Target Geo" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Target Audience']" placeholder="Audience" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Domain Cap']" placeholder="Domain Cap" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Tactics']" placeholder="Tactics" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Delivery Format']" placeholder="Delivery Format" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Attachments']" placeholder="Attachments (Link)" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            <input v-model="salesOppsForm['Last Modified By']" placeholder="Modified By" class="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
            
            <div class="flex gap-2 lg:col-span-2">
              <input v-model="salesOppsForm['Assigned To']" placeholder="Assigned To" class="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] outline-none" />
              <button @click="submitManualEntry" :disabled="loading" class="w-8 h-7 bg-emerald-500 text-white rounded font-black hover:scale-105">+</button>
            </div>
          </div>
        </div>

        <div class="flex flex-col flex-1 gap-2 overflow-hidden shrink-0">
          <div class="flex gap-2 shrink-0">
            <button @click="currentTab = 'preview'" :class="currentTab === 'preview' ? 'bg-[#0B1120] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'" class="px-5 py-2 rounded-xl font-bold text-[11px] transition-all duration-200">Preview Upload Data</button>
            <button @click="currentTab = 'database'" :class="currentTab === 'database' ? 'bg-[#0B1120] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'" class="px-5 py-2 rounded-xl font-bold text-[11px] transition-all duration-200">Database View</button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/40 flex flex-col flex-1 min-h-0 relative">
            <div class="p-3 bg-white border-b border-slate-200 flex flex-col gap-3 shrink-0">
              
              <div v-show="currentTab === 'database'" class="flex gap-3 transition-all duration-300">
                <template v-if="['campaign', 'bd', 'eitn', 'drt'].includes(activeModule)">
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Company</label><input v-model="filters.company" placeholder="Filter company..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Email</label><input v-model="filters.email" placeholder="Filter email..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Phone</label><input v-model="filters.phone" placeholder="Filter phone..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div v-if="activeModule !== 'eitn'" class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Campaign</label><input v-model="filters.campaign" placeholder="Filter campaign..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                </template>

                <template v-else-if="activeModule === 'sales_contacts'">
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">First Name</label><input v-model="filters.firstName" placeholder="Filter first name..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Last Name</label><input v-model="filters.lastName" placeholder="Filter last name..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Job Title</label><input v-model="filters.jobTitle" placeholder="Filter title..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Email</label><input v-model="filters.email" placeholder="Filter email..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                </template>

                <template v-else-if="activeModule === 'sales_opportunities'">
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Organization</label><input v-model="filters.organization" placeholder="Filter org..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Client</label><input v-model="filters.client" placeholder="Filter client..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Opp Name</label><input v-model="filters.oppName" placeholder="Filter name..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Sales Stage</label><input v-model="filters.salesStage" placeholder="Filter stage..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                  <div class="flex-1"><label class="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Modified By</label><input v-model="filters.lastModifiedBy" placeholder="Filter modifier..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"/></div>
                </template>
              </div>
              
              <div class="flex justify-between items-center">
                
                <div class="flex flex-wrap gap-2 items-center">
                  <div v-if="search" class="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] px-3 py-1.5 rounded-full font-bold shadow-sm uppercase tracking-wider">
                    <span>Search: "{{ search }}"</span>
                    <button @click="search = ''" class="hover:bg-blue-200 bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center leading-none transition-colors">×</button>
                  </div>
                  
                  <div v-for="(chip, i) in aiVisualChips" :key="'chip-'+i" class="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] px-3 py-1.5 rounded-full font-bold flex items-center gap-2 shadow-sm uppercase tracking-wider">
                    <span>{{ chip }}</span>
                  </div>
                  <button v-if="aiVisualChips.length > 0" @click="clearAiFilters" class="text-[10px] font-bold text-slate-500 hover:text-rose-500 uppercase tracking-widest ml-1 transition-colors">
                    CLEAR AI SEARCH
                  </button>
                </div>

                <div class="flex items-center gap-4">
                  <div class="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest hidden md:block border border-blue-100">
                    {{ filtered.length }} MATCHES
                  </div>
                  <div class="flex items-center gap-2">
                    <button v-if="currentTab === 'preview' && file" @click="clearPreview" class="group relative flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-all hover:bg-rose-500 hover:text-white active:scale-95 border border-rose-100 hover:border-rose-500">
                      <svg class="h-4 w-4 transition-transform group-hover:-rotate-90 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <button @click="exportData" class="group relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-500 hover:text-white active:scale-95 border border-emerald-100 hover:border-emerald-500">
                      <svg class="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="overflow-auto flex-1 bg-white relative">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-900 sticky top-0 z-20 shadow-md">
                    <th v-if="currentTab === 'database'" class="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-700/50 min-w-[50px] whitespace-nowrap">ID</th>
                    <th v-for="h in headers" :key="h" class="px-4 py-2.5 text-[10px] font-bold text-slate-200 uppercase tracking-widest border-r border-slate-700/50 last:border-r-0 min-w-[150px] whitespace-nowrap">{{ h }}</th>
                    <th v-if="currentTab === 'database'" class="px-4 py-2.5 text-[10px] font-bold text-slate-200 uppercase tracking-widest w-16 text-center sticky right-0 bg-slate-900 z-30 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]">Edit</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  <tr v-if="activeData.length === 0" class="bg-white">
                    <td :colspan="headers.length + 2" class="p-12 text-center text-slate-500 font-medium text-sm">Awaiting data.</td>
                  </tr>
                  <tr v-else-if="paginatedData.length === 0" class="bg-white">
                    <td :colspan="headers.length + 2" class="p-12 text-center text-slate-500 font-medium text-sm">No records match the current filter criteria.</td>
                  </tr>
                  
                  <tr v-for="row in paginatedData" :key="row.id" class="bg-[#F8F3A4] hover:bg-[#EAE593] transition-colors group">
                    <td v-if="currentTab === 'database'" class="px-4 py-2 text-[10px] font-bold text-slate-500 border-r border-[#EAE489]">{{ row.id }}</td>
                    <td v-for="h in headers" :key="h" class="px-4 py-2 text-xs text-slate-800 border-r border-[#EAE489] font-medium truncate max-w-[250px] group-hover:text-black" :title="row.row_data[h]">
                      <input v-if="editingId === row.id" v-model="editFormData[h]" class="w-full bg-white border border-blue-400 rounded shadow-inner px-2 py-1 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                      <span v-else>{{ row.row_data[h] || '-' }}</span>
                    </td>

                    <td v-if="currentTab === 'database'" class="px-2 py-2 text-center border-l border-[#EAE489] sticky right-0 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]" :class="editingId === row.id ? 'bg-[#EAE593]' : 'bg-[#F8F3A4] group-hover:bg-[#EAE593]'">
                      <div v-if="editingId === row.id" class="flex items-center justify-center gap-2">
                        <button @click="saveEdit(row)" class="text-emerald-600 hover:text-emerald-700 hover:scale-110 transition-transform" title="Save"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></button>
                        <button @click="cancelEdit" class="text-rose-600 hover:text-rose-700 hover:scale-110 transition-transform" title="Cancel"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                      </div>
                      <div v-else class="flex items-center justify-center">
                        <button @click="startEdit(row)" class="text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity" title="Edit Row"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="filtered.length > 0" class="p-3 bg-white border-t border-slate-100 flex justify-between items-center shrink-0">
              <div class="text-xs text-slate-400 font-medium ml-2 tracking-wide">Showing <span class="text-slate-700 font-bold">{{ startIndex + 1 }}</span> to <span class="text-slate-700 font-bold">{{ Math.min(startIndex + itemsPerPage, filtered.length) }}</span> of <span class="text-slate-700 font-bold">{{ filtered.length }}</span></div>
              <div class="flex items-center gap-3">
                <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-600 transition-all">Prev</button>
                <div class="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100"><span class="text-slate-700">{{ currentPage }}</span> / {{ totalPages }}</div>
                <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-600 transition-all">Next</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div v-show="isChatOpen" class="bg-slate-900/50 backdrop-blur-2xl w-80 h-96 mb-4 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 flex flex-col overflow-hidden transition-all duration-300">
        
        <div class="bg-white/10 backdrop-blur-md p-4 flex justify-between items-center shrink-0 border-b border-white/10">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span class="text-sm font-black text-white tracking-wide">AI Assistant</span>
          </div>
          <button @click="toggleChat" class="text-white/70 hover:text-white hover:rotate-90 transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-transparent" id="chat-box">
          <div v-for="(msg, i) in chatHistory" :key="i" :class="msg.role === 'user' ? 'self-end' : 'self-start'" class="max-w-[85%]">
            <div :class="msg.role === 'user' ? 'bg-blue-500/80 backdrop-blur-sm border border-blue-400/30 text-white rounded-l-xl rounded-tr-xl' : 'bg-black/40 backdrop-blur-sm text-slate-200 rounded-r-xl rounded-tl-xl border border-white/10'" class="px-3 py-2 text-xs font-medium leading-relaxed shadow-sm">
              {{ msg.text }}
            </div>
            <button v-if="msg.showDownload" @click="exportData" class="mt-2 flex items-center justify-center gap-1.5 w-full bg-emerald-500/90 hover:bg-emerald-400 text-white px-3 py-2 rounded-lg text-[10px] font-black tracking-widest shadow-lg transition-all border border-emerald-400/50 backdrop-blur-sm">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              DOWNLOAD RESULTS
            </button>
          </div>
          <div v-if="isAiTyping" class="self-start bg-black/40 backdrop-blur-sm border border-white/10 text-slate-400 px-4 py-2 rounded-r-xl rounded-tl-xl text-xs flex gap-1">
            <span class="animate-bounce">.</span><span class="animate-bounce delay-75">.</span><span class="animate-bounce delay-150">.</span>
          </div>
        </div>

        <form @submit.prevent="sendChatMessage" class="p-3 bg-black/30 backdrop-blur-md border-t border-white/10 flex gap-2 shrink-0">
          <input v-model="chatInput" placeholder="Ask AI a question or filter..." class="flex-1 bg-black/20 text-white text-xs px-3 py-2 rounded-xl outline-none focus:ring-1 focus:ring-blue-400/50 border border-white/10 placeholder-slate-400 shadow-inner" />
          <button type="submit" :disabled="!chatInput || isAiTyping" class="bg-blue-500/80 backdrop-blur-md border border-blue-400/50 text-white px-3 rounded-xl hover:bg-blue-400/80 transition-colors disabled:opacity-50 shadow-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>

      <button @click="toggleChat" class="h-14 w-14 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_20px_0_rgba(0,0,0,0.4)] flex items-center justify-center text-white hover:scale-110 transition-transform focus:outline-none">
        <svg v-if="!isChatOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import * as XLSX from 'xlsx'

const activeModule = ref('campaign') 
const currentTab = ref('database') 
const dbData = ref([])
const previewData = ref([])
const file = ref(null)
const fileInput = ref(null)

const search = ref('')
const filters = ref({ 
  company: '', email: '', phone: '', campaign: '', reason: '', jobTitle: '',
  firstName: '', lastName: '', organization: '', client: '', oppName: '', salesStage: '', lastModifiedBy: ''
})
const aiQueryAST = ref(null)
const aiVisualChips = ref([]) 
const loading = ref(false)

const isSalesMenuOpen = ref(false)

const currentPage = ref(1)
const itemsPerPage = 150

const defaultEitnForm = () => ({ 'First name': '', 'Last name': '', 'Job title': '', 'Company name': '', 'Email': '', 'Mob number': '', 'PR or Integrated comms or Tech Brand': '', 'First contact date': '', 'Reason': '', 'Interest level': '1', 'Follow up?': '' })
const eitnForm = ref(defaultEitnForm())

const defaultSalesContactsForm = () => ({ 'First Name': '', 'Last Name': '', 'Current Job Title': '', 'Primary Email': '', 'Contact Number': '', 'Country': '', 'Region': '', 'Linked Urls': '', 'Assigned To': '' })
const salesContactsForm = ref(defaultSalesContactsForm())

const defaultSalesOppsForm = () => ({ 'Opportunity Name': '', 'Organization': '', 'Client': '', 'Contact Name': '', 'Sales Stage': '', 'Type': '', 'Campaign Type': '', 'Description': '', 'Start Date': '', 'Expected Close Date': '', 'Total Leads': '', 'CPL': '', 'Total Cost of Project': '', 'Target Geography': '', 'Target Audience': '', 'Domain Cap': '', 'Tactics': '', 'Delivery Format': '', 'Last Modified By': '', 'Attachments': '', 'Assigned To': '' })
const salesOppsForm = ref(defaultSalesOppsForm())

const editingId = ref(null)
const editFormData = ref({})
const startEdit = (row) => { editingId.value = row.id; editFormData.value = { ...row.row_data }; }
const cancelEdit = () => { editingId.value = null; editFormData.value = {}; }
const saveEdit = async (row) => {
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:3000/api/update/${row.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ row_data: editFormData.value })
    });
    if (res.ok) { row.row_data = { ...editFormData.value }; editingId.value = null; }
  } catch (e) { alert("Network error updating row."); } finally { loading.value = false; }
}

const isChatOpen = ref(false)
const chatInput = ref('')
const chatHistory = ref([{ role: 'ai', text: "Hello! I am your AI Database Assistant. Tell me what leads you want to find.", showDownload: false }])
const isAiTyping = ref(false)

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (!isChatOpen.value) {
    chatHistory.value = [{ role: 'ai', text: "Hello! I am your AI Database Assistant. Tell me what leads you want to find.", showDownload: false }];
    chatInput.value = ''; aiQueryAST.value = null; aiVisualChips.value = [];
  }
}
const clearAiFilters = () => { aiQueryAST.value = null; aiVisualChips.value = []; }

const sendChatMessage = async () => {
  if (!chatInput.value.trim()) return;
  const userMessage = chatInput.value;
  chatHistory.value.push({ role: 'user', text: userMessage, showDownload: false });
  chatInput.value = ''; isAiTyping.value = true;
  nextTick(() => { const box = document.getElementById('chat-box'); if (box) box.scrollTop = box.scrollHeight; });

  const formattedHistory = chatHistory.value.slice(-7, -1).filter(msg => msg.text).map(msg => ({ role: msg.role === 'ai' ? 'assistant' : 'user', content: msg.text }));

  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: userMessage, 
        module: activeModule.value, 
        history: formattedHistory, 
        currentSearch: search.value, 
        currentAST: aiQueryAST.value, 
        availableHeaders: headers.value 
      })
    });
    const aiData = await res.json();
    
    if (aiData.clearFilters) {
      search.value = ''; aiQueryAST.value = null; aiVisualChips.value = [];
      Object.keys(filters.value).forEach(k => filters.value[k] = '');
    } else {
      if (aiData.queryAST && Object.keys(aiData.queryAST).length > 0) {
        aiQueryAST.value = aiData.queryAST;
        aiVisualChips.value = aiData.visualSummary || [];
      }
      currentTab.value = 'database'; 
    }
    chatHistory.value.push({ role: 'ai', text: aiData.reply, showDownload: aiData.showDownload });
  } catch (e) {
    chatHistory.value.push({ role: 'ai', text: 'Error connecting to AI Server. Is OpenAI running?', showDownload: false });
  } finally {
    isAiTyping.value = false;
    nextTick(() => { const box = document.getElementById('chat-box'); if (box) box.scrollTop = box.scrollHeight; });
  }
}

const switchModule = async (moduleName) => {
  activeModule.value = moduleName;
  clearPreview(); currentTab.value = 'database'; search.value = ''; aiQueryAST.value = null; aiVisualChips.value = [];
  Object.keys(filters.value).forEach(k => filters.value[k] = '');
  cancelEdit();
  await load();
}

const load = async () => {
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:3000/api/data?module=${activeModule.value}`)
    dbData.value = (await res.json()).map(row => {
      try { 
        // INJECT ID DIRECTLY INTO THE ROW DATA SO THE AI AND UI CAN SEE IT
        const parsed = JSON.parse(row.row_data);
        parsed.ID = String(row.id);
        row.row_data = parsed;
      } catch (e) { 
        row.row_data = { ID: String(row.id) }; 
      }
      return row;
    })
  } catch (err) { console.error("Error loading database:", err); } finally { loading.value = false; }
}

const handleFileSelect = (e) => {
  file.value = e.target.files[0];
  if (!file.value) { clearPreview(); return; }
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const sheet = XLSX.read(data, { type: 'array' }).Sheets[XLSX.read(data, { type: 'array' }).SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const cleanData = XLSX.utils.sheet_to_json(sheet, { range: rows.findIndex(r => r.some(cell => cell !== null && cell !== "")) });
    previewData.value = cleanData.map((row, index) => {
      row.ID = `preview-${index}`;
      return { id: `preview-${index}`, row_data: row };
    });
    currentTab.value = 'preview'; 
  }
  reader.readAsArrayBuffer(file.value);
}

const clearPreview = () => { previewData.value = []; file.value = null; if (fileInput.value) fileInput.value.value = ''; }

const upload = async () => {
  if (previewData.value.length === 0) return alert("No data to save!");
  loading.value = true;
  try {
    // Remove the temporary preview ID before saving to DB
    const dataToSave = previewData.value.map(row => {
      const cleanRow = { ...row.row_data };
      delete cleanRow.ID;
      return cleanRow;
    });
    const res = await fetch('http://localhost:3000/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.value.name, data: dataToSave, module: activeModule.value }) });
    if (res.ok) { clearPreview(); await load(); currentTab.value = 'database'; }
  } catch (e) { alert("Network Error saving data."); } finally { loading.value = false; }
}

const submitManualEntry = async () => {
  loading.value = true;
  let targetData = {};
  if (activeModule.value === 'eitn') targetData = { ...eitnForm.value };
  else if (activeModule.value === 'sales_contacts') targetData = { ...salesContactsForm.value };
  else if (activeModule.value === 'sales_opportunities') targetData = { ...salesOppsForm.value };

  try {
    const res = await fetch('http://localhost:3000/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: 'Manual Entry', data: [targetData], module: activeModule.value }) });
    if (res.ok) { 
      if (activeModule.value === 'eitn') eitnForm.value = defaultEitnForm();
      else if (activeModule.value === 'sales_contacts') salesContactsForm.value = defaultSalesContactsForm();
      else if (activeModule.value === 'sales_opportunities') salesOppsForm.value = defaultSalesOppsForm();
      await load(); currentTab.value = 'database'; 
    }
  } catch (e) { alert("Network Error saving data.") } finally { loading.value = false; }
}

const activeData = computed(() => currentTab.value === 'preview' ? previewData.value : dbData.value)

const headers = computed(() => {
  if (activeData.value.length === 0) return []
  const allKeys = new Set();
  activeData.value.forEach(row => Object.keys(row.row_data).forEach(k => { if (!k.startsWith('__EMPTY') && k !== 'ID') allKeys.add(k) }));
  return Array.from(allKeys).filter(key => activeData.value.some(row => row.row_data[key] !== undefined && row.row_data[key] !== null && row.row_data[key] !== ''));
})

const findMatchingKeys = (rowObj, searchTerms) => {
  const terms = Array.isArray(searchTerms) ? searchTerms : [searchTerms];
  return Object.keys(rowObj).filter(key => terms.some(term => key.toLowerCase().includes(term.toLowerCase())));
}

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

  const matchedKeys = Object.keys(rowData).filter(k => k.toLowerCase().includes(searchCol) || searchCol.includes(k.toLowerCase()));
  if (matchedKeys.length > 0) {
    const combined = matchedKeys.map(k => String(rowData[k])).join(' ').toLowerCase();
    if (isExact) return combined === searchVal;
    return searchVal.split(/\s+/).filter(t => t).every(t => combined.includes(t));
  }
  
  return searchVal.split(/\s+/).filter(t => t).every(t => Object.values(rowData).join(' ').toLowerCase().includes(t));
};

const filtered = computed(() => {
  let result = activeData.value;
  if (search.value) {
    const tokens = search.value.toLowerCase().split(/\s+/).filter(t => t);
    result = result.filter(r => tokens.every(token => Object.values(r.row_data).join(' ').toLowerCase().includes(token)));
  }

  const applyF = (keys, val) => {
    if (!val) return;
    const tokens = val.toLowerCase().split(/\s+/).filter(t => t);
    result = result.filter(r => {
      const matched = findMatchingKeys(r.row_data, keys);
      if (matched.length > 0) return tokens.every(t => matched.map(k => String(r.row_data[k])).join(' ').toLowerCase().includes(t));
      return false;
    });
  }

  applyF(['company', 'organization', 'client'], filters.value.company || filters.value.organization || filters.value.client);
  applyF(['email'], filters.value.email); applyF(['phone', 'mob', 'number'], filters.value.phone);
  applyF(['campaign', 'brand'], filters.value.campaign); applyF(['reason'], filters.value.reason);
  applyF(['job', 'title'], filters.value.jobTitle); applyF(['first'], filters.value.firstName);
  applyF(['last'], filters.value.lastName); applyF(['opp', 'name'], filters.value.oppName);
  applyF(['stage'], filters.value.salesStage); applyF(['modified'], filters.value.lastModifiedBy);

  if (aiQueryAST.value && Object.keys(aiQueryAST.value).length > 0) {
    result = result.filter(row => evaluateAST(row, aiQueryAST.value));
  }

  return result;
})

const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage) || 1)
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const paginatedData = computed(() => filtered.value.slice(startIndex.value, startIndex.value + itemsPerPage))

const exportData = () => {
  if (filtered.value.length === 0) return alert("No data to export!");
  // Do not export the internal ID
  const dataToExport = filtered.value.map(row => {
    const cleanRow = { ...row.row_data };
    delete cleanRow.ID;
    return cleanRow;
  });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataToExport), "Leads");
  XLSX.writeFile(wb, `${activeModule.value}_data_${new Date().toISOString().split('T')[0]}.xlsx`);
}

watch([currentTab, search, filters, aiQueryAST], () => { currentPage.value = 1; cancelEdit(); }, { deep: true })
onMounted(load)
</script>