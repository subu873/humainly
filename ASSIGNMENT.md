# Humainly — Frontend Take-Home: "Insights Assistant"

Build a chat panel called **Insights Assistant**. A user types a natural-language question; the
assistant answers, and the answer renders as real UI. We've included a **mock backend**
(`mock-server.cjs`) that — for any query — **streams** back a JSON answer made of "blocks." Your
job is the front end that talks to it and renders it.

**Stack:** React + TypeScript. **Time:** ~2 days. Use whatever tools/workflow you normally do (AI included).

## Block types the backend sends
- `text` — a markdown paragraph
- `stat` — one KPI (label, value, delta)
- `table` — columns + rows (some responses are small, some are large)
- `list` — cards (title, subtitle, a few fields)
- `chart` — a simple bar series (labels + values)

## Must-have
1. User asks a question → the answer **streams in and renders as it arrives**.
2. Each block renders as proper UI, not raw JSON.
3. The `table` is usable — at minimum sortable by column.
4. Handle the real-world states: loading/streaming, empty, and error.
5. Conversation history stays visible (multiple Q&As stacked).

**Try these queries** (the mock understands them): `top deals`, `by stage`, `contacts`,
`who owns what`, `recent activity`, `account`, `deal timeline`, `forecast`.

## Stretch (only if you have time)
- Let the user show/hide or reorder the table's columns, and have it persist.
- Add re-run / edit on a previous question.

## Deliverable
- A repo that runs with one command (say how in the README).
- A short **README**: how to run it, the main choices you made, and what you'd do next if this
  were going to production.

## How to run the mock backend
```
npm install        # installs express + cors (package.json included)
node mock-server.cjs   # http://localhost:8787
```
Then POST to `http://localhost:8787/api/ask` with `{ "query": "top deals" }` and read the
streamed NDJSON response.
