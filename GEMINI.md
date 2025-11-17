# Project Overview

This project is a user authentication and management system built with Node.js and Express.js. It serves as a foundational boilerplate for applications requiring user registration, login, and session management. It provides both a traditional web interface and a REST API for authentication.

## Key Technologies

*   **Backend:** Node.js, Express.js
*   **Templating:** EJS (Embedded JavaScript)
*   **Database:** MySQL (using `mysql2` driver)
*   **Authentication:** Passport.js (with `passport-local` strategy) and JSON Web Tokens (JWT)
*   **Dependencies:** `bcryptjs` for password hashing, `connect-flash` for flash messages, `dotenv` for environment variables, `express-session` for session management, `jsonwebtoken` for JWTs, and `cors` for Cross-Origin Resource Sharing.

## Architecture

The application follows a standard Model-View-Controller (MVC) pattern and also provides a REST API.

*   **Models:** The `models/User.js` file defines the `User` class, which provides methods for interacting with the `users` table in the database.
*   **Views:** EJS files in the `views` directory are responsible for the UI of the web interface.
*   **Controllers:**
    *   `controllers/userController.js`: Contains the logic for the web interface user actions (registration, login, logout).
    *   `controllers/apiController.js`: Contains the logic for the API endpoints, including user registration and login with JWT generation.
*   **Routes:**
    *   `routes/index.js`: Handles the main routes for the web interface.
    *   `routes/users.js`: Handles user-related routes for the web interface.
    *   `routes/api.js`: Defines the API endpoints (`/api/register`, `/api/login`).
*   **Configuration:** The `configs` directory contains the database configuration (`db.js`) and Passport.js configuration (`passport.js`).
*   **Middleware:** The `middleware/auth.js` file provides the `ensureAuthenticated` middleware for protecting web routes.

## API Endpoints

### `POST /api/register`

*   **Description:** Registers a new user.
*   **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
*   **Response:**
    *   `200 OK`: `{ "msg": "User registered successfully." }`
    *   `400 Bad Request`: `{ "msg": "Please enter all fields" }` or `{ "msg": "User already exists" }`
    *   `500 Internal Server Error`: `{ "msg": "Server Error" }`

### `POST /api/login`

*   **Description:** Logs in a user and returns a JWT.
*   **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
*   **Response:**
    *   `200 OK`: `{ "token": "your_jwt_token" }`
    *   `400 Bad Request`: `{ "msg": "Please enter all fields" }` or `{ "msg": "Invalid credentials" }`
    *   `500 Internal Server Error`: `{ "msg": "Server Error" }`

# Building and Running

(Instructions remain the same as before)

# Development Conventions

*   **ES Modules:** The project uses ES Modules (`import`/`export` syntax).
*   **Dual Interface:** The application provides both a server-rendered web interface and a REST API for authentication.
*   **Authentication:**
    *   Web interface uses Passport.js with sessions.
    *   API uses JSON Web Tokens (JWT).
*   **CORS:** The `cors` middleware is used to handle Cross-Origin Resource Sharing for the API.
