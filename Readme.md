# Task Management Web Application

This project is a task management web application (ToDo List) built using the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, task management, and a modern user interface. The application adheres to the requirements of the provided challenge and includes customizations for specific features.

---

## Features

### Backend (Node.js + Express)

- **Authentication**: Secured with Auth0.
- **Task Management**: CRUD functionality for tasks (Create, Read, Update, Delete).
- **Data Validation**: Input validation with Zod.
- **Error Handling**: Centralized error handling for consistent responses.
- **Swagger Documentation**: API documentation with Swagger.
- **Testing**: Critical unit tests for task creation and other features.

### Frontend (React + Next.js)

- **Authentication**: Integrated with Auth0.
- **State Management**: Redux Toolkit for global state.
- **UI/UX**: Styled Components for custom styling.
- **Task Management**: Users can create, edit, delete, and view tasks.
- **State Persistence**: LocalStorage to persist the authentication state.
- **Testing**: Planned unit tests for critical features.

## Backend Setup

1. **Clone the repository**:

   ```bash
   git clone <https://github.com/Antonioedwardsd/devlab>
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory with the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-app
   AUTH0_CLIENT_ID=<Your Auth0 Client ID>
   AUTH0_CLIENT_SECRET=<Your Auth0 Client Secret>
   AUTH0_API_AUDIENCE=https://taskapi.com/api/tasks
   AUTH0_ISSUER=https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/
   ```

4. **Run the server**:

   ```bash
   npm run dev
   ```

   The backend server will be available at `http://localhost:5000`.

---

## Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the `frontend` directory with the following:

   ```env
   NEXT_PUBLIC_AUTH0_CLIENT_ID=<Your Auth0 Client ID>
   NEXT_PUBLIC_AUTH0_CLIENT_SECRET=<Your Auth0 Client Secret>
   NEXT_PUBLIC_AUTH0_API_AUDIENCE=https://taskapi.com/api/tasks
   NEXT_PUBLIC_AUTH0_ISSUER=https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`.

---

## API Documentation

API documentation is available at `http://localhost:5000/api-docs`.

---

## Running Tests

### Backend Tests

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the tests:
   ```bash
   npm test
   ```

### Frontend Tests

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Run the tests:
   ```bash
   npm test
   ```

---

## Additional Notes

**Code Style**:

- Use `npm run lint` for ESLint checks.
- Use `npm run format` for Prettier formatting.
