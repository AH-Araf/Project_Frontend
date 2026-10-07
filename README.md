# Intelligent University Management System with AI-Powered Automation

A university management system for registration, course enrollment, and result processing, with one desk for students and one for staff.

Students register a semester, enroll in courses, and open results, fees, notices, leave, and documents. Staff open accounts, post records, and handle admissions, leave, documents, and fees. AI automation covers the routine writing: course suggestions, notice briefings, leave notes, fee reminders, document replies, mark sheets, and the morning desk note.

Search uses RAG. Records are embedded with the local model `Xenova/all-MiniLM-L6-v2`, and a question sends only the closest excerpts to the LLM. Answers come from the local LLM `Xenova/LaMini-Flan-T5-248M` first. When that model cannot answer, Gemini is the fallback if `GEMINI_API_KEY` is set.

## Run

```bash
npm install
copy .env.example .env
npm run dev
```

Open http://localhost:3000. On a new Supabase project, run `supabase/schema.sql` in the SQL editor before signing in.

## .env

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only. Creates logins and accepts applications |
| `GEMINI_API_KEY` | Optional. Used when the local model cannot answer |

## Local model

Nothing else to install. The first assistant action downloads `Xenova/LaMini-Flan-T5-248M` (answers) and `Xenova/all-MiniLM-L6-v2` (embeddings) into `.cache`. Staff then open **Assistant** and choose **Rebuild index** so search has something to retrieve. Add `GEMINI_API_KEY` and restart the dev server if you want the Gemini fallback.

## Demo logins

| | Email | Password |
| --- | --- | --- |
| Staff | `admin@baiust.ac.bd` | `Admin@123456` |
| Student | `student@baiust.ac.bd` | `Student@123456` |

Other student accounts use `Student@123456` with their own `@baiust.ac.bd` email.
