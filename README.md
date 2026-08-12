<img width="1709" height="817" alt="Screenshot 2026-08-12 at 09 06 53" src="https://github.com/user-attachments/assets/63a632a8-a533-43b1-8fd9-a693cca6e3ea" />
# EpicGames — Game Shop App

A small game shop web application with a React frontend (Create React App) and a separate backend (provided as a git submodule). It supports browsing games, viewing details, user sign-in/up, user preference/tag tracking, and Stripe-based payments.

## Stack
- Language(s): JavaScript (frontend), CSS, HTML. Backend provided as a submodule (Django expected).
- Frameworks / runtimes:
  - Frontend: React 18 (Create React App)
  - Backend: Django (separate submodule) — runs on port 8000 in development
  - Node.js / npm for frontend tooling
- Notable libraries:
  - React Router (react-router-dom)
  - Redux / Redux Thunk / @reduxjs/toolkit
  - MUI (Material UI) — @mui/material & @mui/icons-material
  - Axios (HTTP client)
  - Stripe (frontend integration: @stripe/stripe-js)

## Highlights / Features
- Homescreen and listing pages for games
- Game detail popup/modal
- User auth (Sign in / Sign up) and profile update
- User preference/tag tracking (stored in localStorage and dispatched to backend)
- Stripe checkout integration with a StripePayment page and Success page
- Proxy configured so frontend dev server forwards API calls to the backend at http://127.0.0.1:8000

## Repository layout (top-level)

```
frontend/         # React app (Create React App)
  package.json
  src/
    pages/        # Homescreen, GamesPage, GamePopup, SignInUp, StripePayment, SuccessPage
    components/   # Header, UpdateUser, etc.
    context/      # AuthContext provider
    actions/      # Redux action creators (e.g., TagsPlacement)
    reducers/     # Redux reducers
    store.js      # Redux store setup
backend/          # Git submodule (Django backend) — initialize submodule to access
README.md         # (this file) place at repo root
```

How it fits together:
- Frontend (React) handles UI, routing, state (Redux) and talks to the backend API for auth, game data, payments, and user preferences. The CRA dev server is proxied to the backend at 127.0.0.1:8000 for convenience.
- Backend (Django) is expected to serve the JSON API and handle server-side tasks (auth, Stripe webhook/endpoints, database).

## Quick start — run locally

Prerequisites:
- Node.js (14+ recommended) and npm or yarn
- Python 3.8+ and pip (for backend)
- Git (to initialize submodules)
- (Optional) PostgreSQL or other DB if backend requires it

Clone and init submodules:
```bash
git clone https://github.com/ioan-ung/EpicGames.git
cd EpicGames
# initialize the backend submodule
git submodule update --init --recursive
```

Backend (Django) — example:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # or .venv\Scripts\activate on Windows
pip install -r requirements.txt    # if provided in submodule
# set environment variables (example names below)
export DJANGO_SECRET_KEY="your-secret"
export DATABASE_URL="postgres://user:pass@localhost:5432/dbname"
export STRIPE_SECRET_KEY="sk_..."
export STRIPE_PUBLISHABLE_KEY="pk_..."
export DEBUG=True
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Frontend (React) — example:
```bash
cd ../frontend
npm install
npm start
# open http://localhost:3000 — dev server proxies API calls to http://127.0.0.1:8000
```

Build for production (frontend):
```bash
cd frontend
npm run build
# serve build/ with your chosen static server or integrate with Django static serving
```

Backend tests (if any):
```bash
cd backend
python manage.py test
```

Frontend tests:
```bash
cd frontend
npm test
```

## Environment variables (suggested)
- Backend (Django):
  - DJANGO_SECRET_KEY
  - DATABASE_URL (or DB_NAME/DB_USER/DB_PASS etc.)
  - DEBUG
  - ALLOWED_HOSTS
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET (if using webhooks)
- Frontend:
  - REACT_APP_API_URL (optional if you want to override the proxy)
  - REACT_APP_STRIPE_PUBLISHABLE_KEY (optional)

<img width="530" height="904" alt="Screenshot 2026-08-12 at 09 08 19" src="https://github.com/user-attachments/assets/104f2bc5-d9cd-4f15-8116-840490c35939" />

Notes:
- The frontend package.json contains a "proxy": "http://127.0.0.1:8000" setting — in development, requests from the React app to unknown paths are forwarded to the backend. For production, configure the frontend to call your deployed backend directly and set CORS accordingly.
- The App.js contains routes for:
  - / (Homescreen)
  - /listGame/ (GamesPage)
  - /gamePage/:id (GamePopup)
  - /signin (SignIn/SignUp)
  - /success (Stripe success)
  - /updateUser (profile updates)
- The app periodically reads "tags" from localStorage and dispatches updateUserPreferences to the store (see src/App.js and actions/TagsPlacement). Ensure backend endpoint exists to accept and persist these updates.

## To do / Improvement ideas
- Add a root README.md (this file) and improve the frontend README (frontend/README.md currently holds boilerplate CRA docs).
- Document backend submodule README with setup instructions and required env vars if it is missing.
- Add CI (tests, lint) and a production deployment guide (e.g., Docker Compose or Heroku/GCP/AWS instructions).
- Secure handling of Stripe keys and webhooks in production (verify webhook signatures, use server-only secrets).

## Contributing
- Fork the repo and make a branch for your change.
- For frontend changes: run and test in the frontend dev server (npm start).
- For backend changes: run backend tests and migrations locally.
- Create PRs describing the change and which part (frontend/backend) it touches.

## License
Specify your preferred license here (e.g., MIT). If already present in repo, keep that.

## Contact
Repository owner: ioan-ung

---
If you want, I can:
- open a PR with this README added at the repository root,
- or produce a trimmed README for the frontend and a separate one for the backend submodule.
