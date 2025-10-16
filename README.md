# Hybrid ATS - 6S Consulting

This is a minimal Proof-of-Concept MERN application implementing:
- Role based auth (Applicant, BotMimic, Admin) using JWT
- Admin manages non-tech applications
- BotMimic auto-progresses tech applications (triggerable)
- Applicants can create & view their applications
- History with timestamps for traceability
- Polling-based frontend (periodically fetches updates)

## Structure
- server/ : Express + Mongoose backend
- client/ : Vite + React frontend

## Quick start (local)

1. Start MongoDB locally
2. Server:
   ```
   cd server
   npm install
   cp .env.example .env
   # edit .env to set MONGO_URI and JWT_SECRET
   npm run dev
   ```
3. Client:
   ```
   cd client
   npm install
   # (optional) set VITE_API_URL in .env
   npm run dev
   ```
4. Use the app:
   - Signup users via /signup
   - Login with role selected
   - Applicant: create applications
   - BotMimic: click "Trigger Automated Progress" to simulate progression for tech roles
   - Admin: view non-tech applications & update status

## Files of interest
- server/src/models/Application.js
- server/src/controllers/applicationController.js
- client/src/pages/*.jsx

