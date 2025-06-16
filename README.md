# Testing Support Desk

This repository contains a simple Node.js support desk application with a frontend and backend. The backend uses MongoDB and Redis.

## Setup

1. Install dependencies (requires npm):
   ```bash
   npm install
   ```

2. Copy `.env` and update the values:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mydb
   REDIS_URL=redis://localhost:6379
   # Optional credentials if your Redis instance requires authentication
   REDIS_USERNAME=default
   REDIS_PASSWORD=yourpassword
   ```

3. Start the backend development server:
   ```bash
   npm run dev
   ```

4. From the `frontend` directory install dependencies and run the React dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The frontend will be available at <http://localhost:5173>.

   Environment variables are not required for the frontend by default, so the
   `.env` file has been removed to avoid confusion.

The server expects a running MongoDB instance and, if Redis requires a password, the credentials must be supplied through the environment variables shown above.
