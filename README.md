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

3. Start the development server:
   ```bash
   npm run dev
   ```

The server expects a running MongoDB instance and, if Redis requires a password, the credentials must be supplied through the environment variables shown above.
