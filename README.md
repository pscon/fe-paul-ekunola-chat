# Chat — Frontend challenge

A responsive chat UI built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **TanStack Query**. It lists messages from the challenge API and sends new messages with a Bearer token.

## Prerequisites

- Node.js 20+ (recommended)
- The **Frontend Challenge Chat API** running locally (see the API repository README for install and `PORT`).

## Setup

1. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` so `VITE_API_BASE_URL` points at your API (e.g. `http://localhost:3000`) and `VITE_AUTH_TOKEN` matches the API’s expected Bearer token.

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open the printed local URL (usually `http://localhost:5173`).

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Vite dev server          |
| `npm run build`  | Typecheck + production build |
| `npm run preview`| Preview production build |
| `npm run lint`   | ESLint                   |
| `npm run test`   | Vitest (watch)           |
| `npm run test:run` | Vitest (CI)            |

## Architecture

- **`src/api/`** — HTTP client with `Authorization: Bearer`, message list/create helpers, and `mapApiMessage` for API shape drift.
- **`src/hooks/`** — `useMessages`, `useSendMessage`, `useLocalStorageAuthor` (display name + `author` on POST).
- **`src/features/chat/`** — `ChatPage`, `MessageList`, `MessageBubble`, `ChatInput`.
- **`src/utils/index.ts`** — shared helpers (`cn`, entity decode, date formatting, `isOwnMessage`, sort, errors).

## API notes

- `GET /api/v1/messages` — optional `limit` and `after` query params.
- `POST /api/v1/messages` — JSON body `{ "message": string, "author": string }`.
- All routes require `Authorization: Bearer <token>`.

If the response JSON uses different property names, adjust mapping only in [`src/api/messages.ts`](src/api/messages.ts).

## Submission

Per the challenge brief: email a link to your repository to `code-challenge@doodle.com` with subject `FE-<yourname>`.
