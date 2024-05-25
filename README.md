# Task Management Application

This is a task management application built with Next.js, TypeScript, Tailwind CSS, and Backend with Node.Js, ExpressJs and MongoDB. It allows users to create, view, update, and delete tasks. The application utilizes local storage for data persistence.

## Features

- View a list of tasks
- Add a new task
- Edit an existing task
- Delete a task

## Technologies Used

### Frontend

- Next.js: A React framework for building server-side rendered applications.
- TypeScript: A statically-typed superset of JavaScript that improves code maintainability and reliability.
- Tailwind CSS: A utility-first CSS framework for styling and layout.

### Backend

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: A fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: A NoSQL database for modern applications.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/akshitgautam42/task-management.git
   ```

2. Navigate to the project directory:
   Fronted

   ```bash
   cd task-management-app
   npm install
   npm run dev

   ```

   Backend

   ```bash
   cd task-management-backend
   npm install
   npm run dev

   ```

3. Open your browser and visit `http://localhost:3000` to see the application and backend is runnig at port 5000.

## Folder Structure

The project's folder structure is as follows:

Frontend:

```bash
- src
  -app
    - favicon.ico
    - layout.tsx
    - page.tsx
  - components
    - ui
    - AddTask.tsx
    - EditTask.tsx
    - Task.tsx
    - TaskFilter.tsx
    - TaskList.tsx
    ..
  - lib
    - utils.ts
  - styles
    - globals.css
```

Backend :

```bash
- src
  - controllers
    - taskController.ts
  - models
    - taskModel.ts
  - routes
    - taskRoutes.ts
  - app.ts
- package.json
- tsconfig.json
```

## License

This project is licensed under the [MIT License](LICENSE).
