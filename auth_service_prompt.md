You are an expert software engineer tasked with building a robust and fully functional user authentication and management system. This system will serve as a foundational boilerplate for other applications, providing both a traditional web interface and a REST API for authentication.

**Your Goal:**
Develop a complete, production-ready authentication service that includes user registration, login, and session management. All components must be functional, adhere to the specified technology stack, and be ready to integrate as an authentication backend for a separate application.

**Technology Stack:**
*   **Backend Framework:** Node.js with Express.js
*   **Templating Engine (for Web UI):** EJS (Embedded JavaScript)
*   **Database:** MySQL (using the `mysql2` driver)
*   **Authentication Libraries:**
    *   Passport.js (with `passport-local` strategy for web authentication)
    *   JSON Web Tokens (JWT) for API authentication
*   **Database ORM/Client:** `mysql2` (direct SQL queries or a lightweight wrapper, no full ORM like Sequelize/TypeORM unless explicitly needed for simplicity)
*   **Other Key Dependencies:**
    *   `bcryptjs` for password hashing
    *   `connect-flash` for flash messages (web)
    *   `dotenv` for environment variable management
    *   `express-session` for session management (web)
    *   `jsonwebtoken` for JWT creation and verification
    *   `cors` for Cross-Origin Resource Sharing (for API)

**Architectural Pattern:**
The application should follow a standard Model-View-Controller (MVC) pattern for the web interface and provide clear separation for the REST API.

**Core Components and Structure:**

*   **`app.js`:** Main application entry point, setting up Express, middleware, and routes.
*   **`configs/`:**
    *   `db.js`: Database connection setup.
    *   `passport.js`: Passport.js configuration and local strategy setup.
*   **`controllers/`:**
    *   `userController.js`: Contains logic for web interface user actions (registration, login, logout).
    *   `apiController.js`: Contains logic for API endpoints (user registration, login with JWT generation).
*   **`middleware/`:**
    *   `auth.js`: Provides `ensureAuthenticated` middleware for protecting web routes.
*   **`models/`:**
    *   `User.js`: Defines the `User` class/module for interacting with the `users` table. This includes methods for:
        *   Creating a new user (hashing password).
        *   Finding a user by email or ID.
        *   Comparing passwords.
*   **`routes/`:**
    *   `index.js`: Handles main web routes (e.g., welcome page).
    *   `users.js`: Handles user-related web routes (e.g., `/register`, `/login`, `/logout`).
    *   `api.js`: Defines API endpoints (e.g., `/api/register`, `/api/login`).
*   **`views/`:** EJS files for the web interface (e.g., `dashboard.ejs`, `layout.ejs`, `login.ejs`, `register.ejs`, `welcome.ejs`, `partials/messages.ejs`).

**Key Features and Functionality:**

1.  **User Registration:**
    *   Web and API endpoints.
    *   Collects `name`, `email`, `password`.
    *   Hashes passwords using `bcryptjs`.
    *   Prevents registration if a user with the email already exists.

2.  **User Login:**
    *   Web (Passport.js with sessions) and API (JWT) endpoints.
    *   Verifies credentials against the database.
    *   For API login, returns a JWT upon successful authentication.
    *   For web login, establishes a session.

3.  **Session Management (Web):**
    *   Uses `express-session` for session handling.
    *   Flash messages (`connect-flash`) for user feedback.

4.  **JWT Authentication (API):**
    *   Generates JWTs upon successful API login.

5.  **CORS:**
    *   `cors` middleware must be configured for API endpoints to allow cross-origin requests.

**Database Schema (MySQL `users` table):**

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**API Endpoints:**

*   **`POST /api/register`**
    *   **Description:** Registers a new user.
    *   **Request Body:**
        ```json
        {
          "name": "string",
          "email": "string",
          "password": "string"
        }
        ```
    *   **Responses:**
        *   `200 OK`: `{ "msg": "User registered successfully." }`
        *   `400 Bad Request`: `{ "msg": "Please enter all fields" }` or `{ "msg": "User already exists" }`
        *   `500 Internal Server Error`: `{ "msg": "Server Error" }`

*   **`POST /api/login`**
    *   **Description:** Logs in a user and returns a JWT.
    *   **Request Body:**
        ```json
        {
          "email": "string",
          "password": "string"
        }
        ```
    *   **Responses:**
        *   `200 OK`: `{ "token": "your_jwt_token" }`
        *   `400 Bad Request`: `{ "msg": "Please enter all fields" }` or `{ "msg": "Invalid credentials" }`
        *   `500 Internal Server Error`: `{ "msg": "Server Error" }`

**Environment Variables (to be loaded via `dotenv`):**

*   `DB_HOST`
*   `DB_USER`
*   `DB_PASSWORD`
*   `DB_NAME`
*   `SESSION_SECRET` (for `express-session`)
*   `JWT_SECRET` (for signing JWTs)

**Development Conventions:**

*   Use ES Modules (`import`/`export` syntax) throughout the project.
*   Ensure all code is clean, well-structured, and follows best practices for Node.js/Express applications.
*   Provide clear error handling and meaningful responses for both web and API interactions.
*   The application should be runnable by simply installing dependencies (`npm install`) and starting the server (`node app.js` or `npm start`).

**Output:**
Provide the complete project structure as a series of file creations and modifications, including all necessary code for each file, and a `package.json` with all specified dependencies. Include instructions on how to set up the `.env` file and the MySQL database. Provide a complete readme file containing a complete guide of how a total newbie can set everything up.