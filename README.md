# Realtime Team Board Frontend

Simple Next.js frontend for manually testing the existing Realtime Team Board backend CRUD endpoints.

## Stack

- Next.js with App Router
- React + TypeScript
- CSS Modules
- TanStack Query
- React Hook Form
- Zod

## Backend expectation

The backend API should already be running at:

`http://localhost:4000`

Frontend API calls are configured through `NEXT_PUBLIC_API_URL`.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell you can use:

```powershell
Copy-Item .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

`http://localhost:3000`

## Available screens

- `/` shows the board list and a form to create a board
- `/boards/:boardId` shows board details, columns, tasks, and forms for column/task creation

## Notes

- No authentication
- No WebSocket
- No drag-and-drop
- Backend URL is not hardcoded in feature code and comes from `NEXT_PUBLIC_API_URL`
