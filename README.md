# TaskFlow Portal

A personal full-stack task management portal built with the MERN stack
(MongoDB, Express, React, Node.js). It was started as a learning project and
completed in October 2026: users can register, log in, and manage their own
tasks through a small REST API with JWT authentication.

## Features

- User registration and login with JWT authentication
- Passwords hashed with bcrypt (password hashes are never returned by the API)
- Each user sees and manages only their own tasks
- Create, view, update (including status: pending / in-progress / completed),
  and delete tasks
- React frontend using hooks and an Axios API client
- Token stored in localStorage; protected API routes require
  `Authorization: Bearer <token>`

## Tech Stack

**Frontend:** React 18, Axios, Create React App

**Backend:** Node.js, Express 5, MongoDB with Mongoose, JWT (jsonwebtoken),
bcryptjs, CORS, dotenv

## Project Structure

```
task-flow-portal/
├── backend/
│   ├── server.js                 Entry point
│   ├── config/
│   │   └── db.js                 MongoDB connection (uses MONGODB_URI)
│   ├── controllers/
│   │   ├── authController.js     Register / login
│   │   └── taskController.js     Task CRUD
│   ├── middleware/
│   │   └── authMiddleware.js     JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── api/
    │   │   └── axios.js          API client (base URL http://localhost:5000/api)
    │   └── components/
    │       ├── Login.js
    │       ├── Register.js
    │       ├── Dashboard.js
    │       └── TaskList.js
    └── package.json
```

## Setup

You need Node.js and a MongoDB instance (a local `mongod`, or a MongoDB
Atlas connection string).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit .env with your values
npm start              # or: npm run dev
```

The `.env` file must define:

| Variable      | Purpose                                   |
|---------------|-------------------------------------------|
| `MONGODB_URI` | MongoDB connection string                 |
| `JWT_SECRET`  | Secret used to sign JWTs (long & random)  |
| `PORT`        | Port for the API server (default `5000`)  |

The API runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

The React app runs on `http://localhost:3000` and expects the API at
`http://localhost:5000/api` (see `frontend/src/api/axios.js`).

## API Endpoints

### Auth

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login, returns a JWT |

### Tasks (all require `Authorization: Bearer <token>`)

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/api/tasks`      | List the logged-in user's tasks |
| POST   | `/api/tasks`      | Create a task                |
| PUT    | `/api/tasks/:id`  | Update a task (title, description, status) |
| DELETE | `/api/tasks/:id`  | Delete a task                |

## Authentication Flow

1. User registers or logs in.
2. Backend returns a JWT signed with `JWT_SECRET`.
3. Frontend stores the token in localStorage.
4. Task requests send the token in the `Authorization` header.
5. Middleware verifies the token and attaches the user id to the request.
