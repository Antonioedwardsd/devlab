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

### Backend CRUD Tests

```json
{
  "clientName": "Thunder Client",
  "collectionName": "Todos",
  "collectionId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
  "dateExported": "2025-01-24T13:36:35.865Z",
  "version": "1.2",
  "folders": [],
  "requests": [
    {
      "_id": "e79a44c7-010f-453e-8f2b-c1482e64b1f9",
      "colId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
      "containerId": "",
      "name": "Get Todos",
      "url": "http://localhost:5000/api/todos/6792ecb2dc0794c74d9bc6c8",
      "method": "GET",
      "sortNum": 10000,
      "created": "2025-01-24T13:28:38.030Z",
      "modified": "2025-01-24T13:30:54.220Z",
      "headers": [
        {
          "name": "Authorization",
          "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhN2E0Mzc4My1mNGNlLTQxMjAtOWI4ZC00NDYwOGU0ZTQ4ZGQiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzY4NTkxNjEsImV4cCI6MTczNjk0NTU2MX0.E4UztBSeYR6B3-1jSZ-sCadJqZh3Yo8vItSh6V4YUhs"
        }
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"title\": \"Updated\",\n  \"description\": \"This is the description of the second task\"\n}\n",
        "form": []
      },
      "auth": {
        "type": "bearer",
        "bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc2NzI5NTcsImV4cCI6MTczNzg1OTM1Nywic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.J7rmaLFIa1TG9UmILNKIALNnUe0YUy-HILtP9cP1ox937xr5rCdChDu6S3W5qXyFH4olLA2E_H3141JlgYEUCCHC-W0Tta64xCpYIBhn7nkqdxM6JimxZ2Zk7OJ-lxJL0pKn6OEJ8jzE_Uz5RLzBPdsNOxYyLDGXUEaqo5x6SXFPRJAzcliloSrEiKoHxNJf-m3ozCVmZKPQ1RTyX4oAgvIiXswNzj1Qyd3CMWWNZ8KoEHOAYUmQIoSgEEBTU-_aZ2u4_MhZCL3cy96WxjSSaUUWE_PJnsI26JyyZZRQGTxrwXNdGKmp5_w60d8lFMgi_HJ8ZDVxSkdiWrDclYEgcA"
      }
    },
    {
      "_id": "56cc4fa5-72dc-4b51-b2c9-20ebd4def0eb",
      "colId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
      "containerId": "",
      "name": "Get Token",
      "url": "https://dev-3iiyrnf7x5ya3qwp.us.auth0.com/oauth/token",
      "method": "POST",
      "sortNum": 20000,
      "created": "2025-01-24T13:29:37.077Z",
      "modified": "2025-01-24T13:29:37.077Z",
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"grant_type\": \"client_credentials\",\n  \"client_id\": \"Ag9aOPYe7gF4bI5QoHkobG6R9VldfuZv\",\n  \"client_secret\": \"co820BQXB5Tj8OR_ucYMNh21aQ4JqwlhU1c6ScHeFhRJoM39LcnybKggd_F4kNNi\",\n  \"audience\": \"https://taskapi.com/api/tasks\"\n}",
        "form": []
      },
      "auth": {
        "type": "bearer",
        "bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc0NjYzNDAsImV4cCI6MTczNzY1Mjc0MCwic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.P5YwoODzUzo1aHByTOAK9atxm_8rS-qePDNKPtzadCgxNmDXKPRtJuohS5vBpkmDw2Acvti1UYmi_es_fK-40Jg9u3716Gduefn5OfSs6cxAG84ByDj4CHatXs-XLYPBu_CZa4dIDp2n_9xL349mrkOZMdRDLvkRvNqGP5EhSsXE04IEPO_KekuHquTQ3donZpuDRglzx5-26OcUY4t559nHVkX4aHsYdkpApjI2hdFHxM7bo9rVYP2XmTvK1MMnIKawGXwZmKZLnYgJdeGOYDRsoyHE-3a4PwT6wSOssPaOqDsxBsKB4bhw9Eo3XK0d4sm4PmNSDmAdJPZaB2mzlQ"
      }
    },
    {
      "_id": "12aa2b3c-8e76-4657-a21d-bd30cc37e3e0",
      "colId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
      "containerId": "",
      "name": "Get Todo by ID",
      "url": "http://localhost:5000/api/todos/6792ecb2dc0794c74d9bc6c8",
      "method": "GET",
      "sortNum": 30000,
      "created": "2025-01-24T13:32:00.117Z",
      "modified": "2025-01-24T13:32:00.117Z",
      "headers": [
        {
          "name": "Authorization",
          "value": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc0NjYzNDAsImV4cCI6MTczNzY1Mjc0MCwic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.P5YwoODzUzo1aHByTOAK9atxm_8rS-qePDNKPtzadCgxNmDXKPRtJuohS5vBpkmDw2Acvti1UYmi_es_fK-40Jg9u3716Gduefn5OfSs6cxAG84ByDj4CHatXs-XLYPBu_CZa4dIDp2n_9xL349mrkOZMdRDLvkRvNqGP5EhSsXE04IEPO_KekuHquTQ3donZpuDRglzx5-26OcUY4t559nHVkX4aHsYdkpApjI2hdFHxM7bo9rVYP2XmTvK1MMnIKawGXwZmKZLnYgJdeGOYDRsoyHE-3a4PwT6wSOssPaOqDsxBsKB4bhw9Eo3XK0d4sm4PmNSDmAdJPZaB2mzlQ"
        }
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"title\": \"Other Todo\",\n  \"description\": \"Other description\"\n}",
        "form": []
      },
      "auth": {
        "type": "bearer",
        "bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc2NzI5NTcsImV4cCI6MTczNzg1OTM1Nywic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.J7rmaLFIa1TG9UmILNKIALNnUe0YUy-HILtP9cP1ox937xr5rCdChDu6S3W5qXyFH4olLA2E_H3141JlgYEUCCHC-W0Tta64xCpYIBhn7nkqdxM6JimxZ2Zk7OJ-lxJL0pKn6OEJ8jzE_Uz5RLzBPdsNOxYyLDGXUEaqo5x6SXFPRJAzcliloSrEiKoHxNJf-m3ozCVmZKPQ1RTyX4oAgvIiXswNzj1Qyd3CMWWNZ8KoEHOAYUmQIoSgEEBTU-_aZ2u4_MhZCL3cy96WxjSSaUUWE_PJnsI26JyyZZRQGTxrwXNdGKmp5_w60d8lFMgi_HJ8ZDVxSkdiWrDclYEgcA"
      }
    },
    {
      "_id": "257278aa-9a2d-4ad4-aee1-54284f8d2df5",
      "colId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
      "containerId": "",
      "name": "Delete Todo",
      "url": "http://localhost:5000/api/todos/6793966747f0b5e9fa727e50",
      "method": "DELETE",
      "sortNum": 40000,
      "created": "2025-01-24T13:33:45.046Z",
      "modified": "2025-01-24T13:33:45.046Z",
      "headers": [
        {
          "name": "Authorization",
          "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhN2E0Mzc4My1mNGNlLTQxMjAtOWI4ZC00NDYwOGU0ZTQ4ZGQiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzY4NTkxNjEsImV4cCI6MTczNjk0NTU2MX0.E4UztBSeYR6B3-1jSZ-sCadJqZh3Yo8vItSh6V4YUhs"
        }
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"title\": \"Updated\",\n  \"description\": \"This is the description of the second task\"\n}\n",
        "form": []
      },
      "auth": {
        "type": "bearer",
        "bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc2NzI5NTcsImV4cCI6MTczNzg1OTM1Nywic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.J7rmaLFIa1TG9UmILNKIALNnUe0YUy-HILtP9cP1ox937xr5rCdChDu6S3W5qXyFH4olLA2E_H3141JlgYEUCCHC-W0Tta64xCpYIBhn7nkqdxM6JimxZ2Zk7OJ-lxJL0pKn6OEJ8jzE_Uz5RLzBPdsNOxYyLDGXUEaqo5x6SXFPRJAzcliloSrEiKoHxNJf-m3ozCVmZKPQ1RTyX4oAgvIiXswNzj1Qyd3CMWWNZ8KoEHOAYUmQIoSgEEBTU-_aZ2u4_MhZCL3cy96WxjSSaUUWE_PJnsI26JyyZZRQGTxrwXNdGKmp5_w60d8lFMgi_HJ8ZDVxSkdiWrDclYEgcA"
      }
    },
    {
      "_id": "facd43e4-c769-4169-b524-80fade284e24",
      "colId": "1ec65dde-f346-4871-8f18-2561a4cabc0e",
      "containerId": "",
      "name": "Update Todo",
      "url": "http://localhost:5000/api/todos/679390ece237813dd6e61f7e",
      "method": "PUT",
      "sortNum": 50000,
      "created": "2025-01-24T13:35:12.181Z",
      "modified": "2025-01-24T13:35:12.181Z",
      "headers": [
        {
          "name": "Authorization",
          "value": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc0NjYzNDAsImV4cCI6MTczNzY1Mjc0MCwic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.P5YwoODzUzo1aHByTOAK9atxm_8rS-qePDNKPtzadCgxNmDXKPRtJuohS5vBpkmDw2Acvti1UYmi_es_fK-40Jg9u3716Gduefn5OfSs6cxAG84ByDj4CHatXs-XLYPBu_CZa4dIDp2n_9xL349mrkOZMdRDLvkRvNqGP5EhSsXE04IEPO_KekuHquTQ3donZpuDRglzx5-26OcUY4t559nHVkX4aHsYdkpApjI2hdFHxM7bo9rVYP2XmTvK1MMnIKawGXwZmKZLnYgJdeGOYDRsoyHE-3a4PwT6wSOssPaOqDsxBsKB4bhw9Eo3XK0d4sm4PmNSDmAdJPZaB2mzlQ"
        }
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"title\": \"Updated Todo\",\n  \"description\": \"Optional description\"\n}",
        "form": []
      },
      "auth": {
        "type": "bearer",
        "bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKeUZkbFpKRVV2YlduczZ1TnJTciJ9.eyJpc3MiOiJodHRwczovL2Rldi0zaWl5cm5mN3g1eWEzcXdwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJBZzlhT1BZZTdnRjRiSTVRb0hrb2JHNlI5VmxkZnVadkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBpLmNvbS9hcGkvdGFza3MiLCJpYXQiOjE3Mzc2NzI5NTcsImV4cCI6MTczNzg1OTM1Nywic2NvcGUiOiJyZWFkOnRvZG9zIGNyZWF0ZTp0b2RvcyB1cGRhdGU6dG9kb3MgZGVsZXRlOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQWc5YU9QWWU3Z0Y0Ykk1UW9Ia29iRzZSOVZsZGZ1WnYiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnRvZG9zIiwiY3JlYXRlOnRvZG9zIiwidXBkYXRlOnRvZG9zIiwiZGVsZXRlOnRvZG9zIl19.J7rmaLFIa1TG9UmILNKIALNnUe0YUy-HILtP9cP1ox937xr5rCdChDu6S3W5qXyFH4olLA2E_H3141JlgYEUCCHC-W0Tta64xCpYIBhn7nkqdxM6JimxZ2Zk7OJ-lxJL0pKn6OEJ8jzE_Uz5RLzBPdsNOxYyLDGXUEaqo5x6SXFPRJAzcliloSrEiKoHxNJf-m3ozCVmZKPQ1RTyX4oAgvIiXswNzj1Qyd3CMWWNZ8KoEHOAYUmQIoSgEEBTU-_aZ2u4_MhZCL3cy96WxjSSaUUWE_PJnsI26JyyZZRQGTxrwXNdGKmp5_w60d8lFMgi_HJ8ZDVxSkdiWrDclYEgcA"
      }
    }
  ],
  "ref": "vvcdfOYXE2oIUl6YedSM22i82nFi5lSfDgMw5B3uyeCPU7r2AnL3NFGzmIgJ88utVcDGhoqnxSRelIg70mygCg"
}
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
