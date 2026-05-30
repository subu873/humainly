# 🚀 Humainly Streaming Data Assignment

A real-time data streaming application that connects to a backend server and dynamically renders streamed responses in the UI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Scripts](#scripts)

---

## Overview

This project is a **Humainly company assignment** that demonstrates real-time data streaming from a backend server to a frontend UI. As the server streams data chunks, the UI updates dynamically to display the incoming content — providing a smooth, live experience similar to how modern AI chat interfaces work.

---

## Tech Stack

- **Frontend:** React
- **Runtime:** Node.js v22
- **Package Manager:** Yarn
- **Streaming:**  Fetch Streaming API
- **Styling:** Tailwind CSS / CSS Modules

---

## Prerequisites

Make sure you have the following installed before running the project:

- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com/)
- Node.js **v22** (managed via nvm)

---

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/humainly-streaming-assignment.git
cd humainly-streaming-assignment
```

### 2. Switch to Node.js v22

```bash
nvm use 22
```

> If Node.js v22 is not installed, run: `nvm install 22`

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start the Development Server

```bash
yarn dev
```

The app will be available at **http://localhost:3000**

---


---

## How It Works

1. **Backend Connection** — The frontend connects to the backend server via a streaming-capable API (Fetch Streams).
2. **Data Streaming** — The backend sends data in chunks as it becomes available.
3. **Real-time UI Update** — Each incoming chunk is processed and rendered incrementally in the UI without waiting for the full response.
4. **Stream Completion** — Once the stream ends, the UI reflects the complete data.

```
Backend Server
     │
     │  Stream chunks (Fetch)
     ▼
Frontend Client
     │
     │  Process chunks in real-time
     ▼
   React UI
     │
     │  Render incrementally
     ▼
  User View
```

---

## Scripts

| Command        | Description                        |
|----------------|------------------------------------|
| `yarn dev`     | Start the development server       |
| `yarn build`   | Build the app for production       |
| `yarn start`   | Start the production server        |
| `yarn lint`    | Run ESLint checks                  |

---

## Assignment Details

- **Company:** Humainly
- **Task:** Streaming data from a backend server and rendering server responses in real-time on the UI
- **Node Version:** 22 (via nvm)

---

## 📝 Notes

- Make sure the backend server is running before starting the frontend.
- The `.nvmrc` file is set to Node.js `22` — running `nvm use` in the project root will automatically switch to the correct version.
- All dependencies are managed via Yarn — avoid using `npm install` to prevent lockfile conflicts.