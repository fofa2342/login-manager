# Login Manager

This is a user authentication and management system built with Node.js and Express.js. It serves as a foundational boilerplate for applications requiring user registration, login, and session management. It provides both a traditional web interface and a REST API for authentication.

## Prerequisites

*   Node.js and npm
*   MySQL

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fofa2342/login-manager.git
cd login-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

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

### 4. Configure environment variables

Create a `.env` file in the root of the project and add the following variables, replacing the values with your database credentials:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

### 5. Run the application

*   **Development mode (with auto-restarting):**
    ```bash
    npm run dev
    ```

*   **Production mode:**
    ```bash
    npm start
    ```

The application will be running at `http://localhost:5000`.

## API Usage

This application provides a REST API for user authentication.

### Register a new user

*   **Endpoint:** `POST /api/register`
*   **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*   **Example:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }' http://localhost:5000/api/register
    ```
*   **Response:**
    ```json
    {
      "msg": "User registered successfully."
    }
    ```

### Login

*   **Endpoint:** `POST /api/login`
*   **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*   **Example:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "email": "john@example.com",
      "password": "password123"
    }' http://localhost:5000/api/login
    ```
*   **Response:**
    ```json
    {
      "msg": "Login successful"
    }
    ```

## Key Technologies

*   **Backend:** Node.js, Express.js
*   **Templating:** EJS (Embedded JavaScript)
*   **Database:** MySQL (using `mysql2` driver)
*   **Authentication:** Passport.js (with `passport-local` strategy)
*   **Dependencies:** `bcryptjs` for password hashing, `connect-flash` for flash messages, `dotenv` for environment variables, `express-session` for session management, and `cors` for Cross-Origin Resource Sharing.

