# Habit Tracker 🌱

A full-stack habit tracking app that helps you build positive routines, set goals, and get personalized AI coaching based on your habits.

---

## Features

- **Authentication** — Sign up and sign in with JWT-based session management
- **Habit Management** — Create, edit, and track your daily/weekly habits with completion tracking
- **Goals** — Set and manage personal goals linked to your habits
- **AI Coach** — Get personalized insights, new habit suggestions, and answers to free-text questions powered by Claude AI

---

## Tech Stack

### Frontend
- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- [Anthropic Claude API](https://www.anthropic.com/) (`claude-sonnet-4-5`)

---

## Project Structure

```
Habit_Tracker/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       └── utils/
└── frontend/
    └── app/
        ├── components/
        ├── context/
        ├── services/
        ├── habits/
        ├── goals/
        ├── ai/
        ├── signIn/
        └── signUp/
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Anthropic API key

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Start the server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login and receive JWT |

### Habits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habits` | Get all habits for the logged-in user |
| POST | `/api/habits` | Create a new habit |
| PUT | `/api/habits/:id` | Update a habit |
| DELETE | `/api/habits/:id` | Delete a habit |

### Goals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create a new goal |
| PUT | `/api/goals/:id` | Update a goal |
| DELETE | `/api/goals/:id` | Delete a goal |

### AI Coach
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai` | Get AI insights (`review_habits`, `suggest_new`, `free_text`) |

---

## AI Coach

The AI Coach uses Claude to provide three types of responses based on the user's actual habit data:

- **Review habits** — 3 personalized encouraging insights about your current habits
- **Suggest new** — 3 new habit suggestions that complement your existing ones
- **Free text** — Ask any question and get a personalized answer in context of your habits

All responses are in Hebrew.

---

## Author

**Gal Greenberg**  
[GitHub](https://github.com/Gal-Greenberg)
