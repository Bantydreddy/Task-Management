# Task Management Dashboard (React)

A task management dashboard built with React to practice and demonstrate core frontend development skills.

The app lets users manage daily tasks through a clean, intuitive interface, focusing on usability, state management and real-world frontend logic.

## Features
- Create, complete and delete tasks (press Enter or click **Add**)
- Filter tasks by status: All, Pending, Completed
- Live dashboard stats (total, pending, completed) with a progress bar
- "Clear completed" button to tidy up in one click
- Friendly empty states and input validation
- Tasks are saved automatically in the browser with `localStorage`
- Responsive layout that works on phones, plus keyboard and screen-reader friendly controls

## Tech Stack
- React 18
- Vite
- JavaScript (ES6+)
- CSS3

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build
```

## Project Structure

```
Task-Management/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx   # app entry point
    ├── App.jsx    # all task logic and UI
    └── App.css    # styling
```

## Why this project
I built this project to strengthen my understanding of React components, state handling and user interaction while working on a realistic frontend use case. It reflects how I approach building practical, maintainable web interfaces.
