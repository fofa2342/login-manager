# Project Overview

This project is a user authentication and management system built with Node.js and Express.js. It serves as a foundational boilerplate for applications requiring user registration, login, and session management. The application uses EJS (Embedded JavaScript) for server-side templating, allowing for dynamic rendering of HTML pages. For data persistence, it connects to a MySQL database, as configured in `configs/db.js`.

## Key Technologies

*   **Backend:** Node.js, Express.js
*   **Templating:** EJS (Embedded JavaScript)
*   **Database:** MySQL (using `mysql2` driver)
*   **Authentication:** Passport.js (with `passport-local` strategy)
*   **Dependencies:** `bcryptjs` for password hashing, `connect-flash` for flash messages, `dotenv` for environment variables, `express-session` for session management.

## Architecture

The application follows a standard Model-View-Controller (MVC) pattern:

*   **Models:** The `models/User.js` file defines the `User` class, which provides methods for interacting with the `users` table in the database. This includes creating users, finding them by email or ID, and comparing passwords.
*   **Views:** EJS files in the `views` directory are responsible for the UI. The `views/partials/messages.ejs` partial is used to display flash messages to the user.
*   **Controllers:** The `controllers/userController.js` file contains the logic for handling user-related actions, such as registration, login, and logout.
*   **Routes:** The `routes` directory defines the application's endpoints. `index.js` handles the main routes, including the protected dashboard route. `users.js` handles user-related routes like `/login` and `/register`, and connects them to the `userController`.
*   **Configuration:** The `configs` directory contains the database configuration (`db.js`) and Passport.js configuration (`passport.js`).
*   **Middleware:** The `middleware/auth.js` file provides the `ensureAuthenticated` middleware, which is used to protect routes and ensure that only authenticated users can access them.

# Building and Running

## Prerequisites

*   Node.js and npm installed.
*   A running MySQL database instance.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Database Setup:**
    Create a database in your MySQL server. Then, execute the following SQL query to create the `users` table:

    ```sql
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    DB_PORT=your_db_port
    ```

## Running the Application

*   **Production Mode:**
    ```bash
    npm start
    ```

*   **Development Mode (with auto-restarting):**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5000`.

# Development Conventions

*   **ES Modules:** The project uses ES Modules (`import`/`export` syntax).
*   **Routing:** Routes are separated into different files based on their functionality and connected to controllers.
*   **Templating:** EJS is used for templating, with a main layout file (`views/layout.ejs`) and partials for reusable components.
*   **Database:** The database connection is centralized in `configs/db.js` and relies on environment variables for configuration.
*   **Authentication:** Authentication is handled by Passport.js, with the configuration separated in `configs/passport.js`. Route protection is handled by the `ensureAuthenticated` middleware.
