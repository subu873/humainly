// Insights Assistant — mock backend for the Humainly frontend take-home.
// The DATA lives in responses.json (open that to read it). This file just streams it.
// No DB, no LLM, no API keys, no internet. It plays the role of "your backend after it
// has already shaped the LLM/tool output into typed UI blocks."
//
// Run:  npm install && node mock-server.cjs   ->  http://localhost:8787
// Front end POSTs { query } to /api/ask and receives a STREAM of NDJSON "blocks".

const fs = require('fs');
const path = require('path');
const express = require('express'); const cors = require('cors');
const app = express(); app.use(cors()); app.use(express.json());
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SCENARIOS = JSON.parse(fs.readFileSync(path.join(__dirname, 'responses.json'), 'utf8'));
const DEFAULT = [{ type: 'text', text: "Try: 'top deals', 'by stage', 'contacts', 'who owns what', 'recent activity', 'account', 'deal timeline', 'forecast'." }];

app.post('/api/ask', async (req, res) => {
  const q = (req.body.query || '').toLowerCase();
  const hit = SCENARIOS.find(s => s.match.some(m => q.includes(m)));
  res.setHeader('Content-Type', 'application/x-ndjson');

  // 'forecast' -> emit a valid block, then malformed JSON mid-stream (tests error handling)
  if (hit && hit.blocks === '__MALFORMED__') {
    res.write(JSON.stringify({ type: 'text', text: 'Generating your forecast...' }) + '\n'); await sleep(300);
    res.write('{ this is : not valid json\n'); return res.end();
  }

  const blocks = hit ? hit.blocks : DEFAULT;
  for (const b of blocks) {                       // 500ms gap between blocks -> tests streaming
    res.write(JSON.stringify(b) + '\n');
    await sleep(500);
  }
  res.end();
});

app.listen(8787, () => console.log('mock server on http://localhost:8787'));
