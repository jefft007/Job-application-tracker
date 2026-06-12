# Job Application Tracker 🎯

A premium, full-stack web application designed to help you organize, track, and analyze your job hunting process. Built with **React** (Vite) on the frontend and **Django REST Framework** on the backend.

![Dashboard Preview](frontend/public/dashboard-preview.png)

## Features ⭐⭐⭐⭐⭐
- **Dynamic Dashboard**: Visualize your application funnel with interactive Pie and Bar charts.
- **Smart Follow-ups**: Automatically flags applications that haven't received a response in 7+ days.
- **Detailed Tracking**: Keep track of application statuses, location, role, and the specific resume version you submitted.
- **Interview Notes**: Maintain round-by-round interview notes right alongside the application.
- **Premium UI/UX**: Features a custom dark-mode glassmorphism design with responsive tables and micro-animations.

## Tech Stack
- **Frontend**: React (Vite), React Router, Recharts, Vanilla CSS (Premium Theme)
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (Configured to be easily swappable with PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.9+)

### 1. Backend Setup
Navigate to the backend directory, activate the virtual environment, and start the Django server:

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

## Deployment
This project is structured to be easily deployed to modern cloud platforms:
- **Frontend**: Deploy the `frontend/` directory to Vercel or Netlify.
- **Backend**: Deploy the `backend/` directory to Render or Heroku. Make sure to configure your `ALLOWED_HOSTS` and switch the database to PostgreSQL in `settings.py`.
