# Disaster Alert and Community Response App

## 1. Project Title

**Disaster Alert and Community Response App** — an academic B.Tech CSIT project demonstration.

## 2. Project Description

The Disaster Alert and Community Response App is a web application designed to organize disaster
information, incident reports, emergency requests, safe locations, and community coordination in
order to support faster disaster response.

This first version is a **working local demonstration**: a React (Vite) frontend communicating with
a Node.js/Express backend over REST APIs, using realistic in-memory mock data instead of a real
database. It is intended to be run locally and shown to faculty as a functional prototype, and later
extended (e.g. in an AI coding environment such as Google Antigravity) with a real database,
authentication, and additional features.

> **Disclaimer:** This is an academic demonstration project only. It is **not** a real emergency
alert or response service. Do not use it to report or respond to actual disasters.

## 3. Features

- Interactive dashboard with live statistics pulled from the backend API
- Disaster alerts list with search and severity filtering
- Incident reporting form with validation, live submission, and list refresh
- Emergency request form with validation, priority levels, and live submission
- Safe locations directory (shelters, hospitals, relief centers) with capacity indicators
- Community response / volunteer directory
- About page explaining the project's purpose and scope
- Loading states, error states, empty states, and success/error notifications throughout
- Responsive, professional dashboard-style UI (white/blue/neutral theme)

## 4. Technology Stack

**Frontend:** React, Vite, JavaScript, React Router, CSS, Fetch API

**Backend:** Node.js, Express.js, JavaScript, REST APIs, CORS, in-memory mock data

## 5. Folder Structure

```
 disaster-alert-community-response/
 ├── backend/
 │   ├── data/
 │   │   └── mockData.js
 │   ├── server.js
 │   ├── package.json
 │   └── ...
 ├── frontend/
 │   ├── index.html
 │   ├── vite.config.js
 │   ├── package.json
 │   └── src/
 │       ├── api/
 │       │   └── api.js
 │       ├── components/
 │       ├── pages/
 │       ├── styles/
 │       ├── App.jsx
 │       └── main.jsx
 ├── .gitignore
 └── README.md
```

## 6. Requirements

- [Node.js](https://nodejs.org/) v18 or newer (includes npm)
- Windows with PowerShell (these instructions use PowerShell commands)
- No API keys, cloud services, external databases, or Docker are required for this version

## 7. Installation Instructions

Extract the project ZIP file, then open **two separate PowerShell windows** — one for the backend
and one for the frontend, since both need to run at the same time.

## 8. Frontend Setup

In a PowerShell window:

```powershell
cd disaster-alert-community-response\\frontend
npm install
```

## 9. Backend Setup

In a separate PowerShell window:

```powershell
cd disaster-alert-community-response\\backend
npm install
```

## 10. How to Run the Backend

From the `backend` folder:

```powershell
npm start
```

You should see confirmation that the server is running at `http://localhost:5000`.

## 11. How to Run the Frontend

From the `frontend` folder (in a separate PowerShell window, with the backend already running):

```powershell
npm run dev
```

Vite will start the frontend at `http://localhost:5173`. Open that URL in your browser.

> **Important:** Start the backend first, then the frontend. The frontend fetches data from the
backend at `http://localhost:5000`; if the backend isn't running, pages will show a clear error
state instead of crashing.

## 12. API Endpoint List

| Method | Endpoint                     | Description                              |
|--------|-------------------------------|-------------------------------------------|
| GET    | `/api/health`                 | Backend health check                     |
| GET    | `/api/alerts`                 | List all disaster alerts                 |
| GET    | `/api/incidents`              | List all reported incidents              |
| POST   | `/api/incidents`              | Submit a new incident report             |
| GET    | `/api/emergency-requests`     | List all emergency requests              |
| POST   | `/api/emergency-requests`     | Submit a new emergency request           |
| GET    | `/api/safe-locations`         | List all safe locations                  |
| GET    | `/api/volunteers`             | List all community volunteers/responders |

All responses are JSON. All endpoints are prefixed with `http://localhost:5000`.

## 13. Frontend-Backend Architecture

```
React (Vite) frontend  --HTTP/JSON-->  Express backend  --reads/writes-->  In-memory mock data
http://localhost:5173                 http://localhost:5000
```

- The frontend never hard-codes application data into components; every page fetches from the
backend REST API via `src/api/api.js`, which centralizes all `fetch()` calls.
- CORS is configured on the backend to explicitly allow requests from `http://localhost:5173`.
- POST requests (incident reports, emergency requests) are validated on the backend; invalid
submissions return a `400` response with a descriptive message, which the frontend surfaces to the user.

## 14. Current Limitation: Temporary In-Memory Data

This version does **not** use a real database. All data (including alerts, incidents, emergency
requests, safe locations, and volunteers) is stored in JavaScript arrays in the backend's memory.
Newly submitted incidents and emergency requests will appear immediately in the UI, but **all data
resets whenever the backend server is restarted**.

## 15. Future Development

Planned next steps (to be implemented in a follow-up iteration, e.g. using an AI coding agent such
as Google Antigravity):

- Integrate a MySQL database for persistent storage
- Add user authentication (reporters, volunteers, administrators)
- Containerize the application with Docker
- Add real-time notifications for new alerts and emergency requests
- Add map-based visualization of alerts, incidents, and safe locations

---

### Quick Start Summary (PowerShell)

```powershell
# Terminal 1 - Backend
cd disaster-alert-community-response\\backend
npm install
npm start

# Terminal 2 - Frontend
cd disaster-alert-community-response\\frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health
