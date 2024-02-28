

# Todo App with Node, Redis, React, Material-UI, Vite, Axios

This is a simple todo application built with Node.js, Express, Redis, React, Material-UI, Vite, and Axios.

## Prerequisites

- Node.js installed on your machine
- Redis server running on your local machine

## Getting Started

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/DHANRAJCHOUDHARY244/REDIS.git
   ```

2. Navigate to the backend folder:

   ```bash
   cd redis
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd redis/redis
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

## Features

- Add a new todo
- Delete a todo
- Filter todos by status (all, active, completed)

## Technologies Used

- Node.js
- Express
- Redis
- React
- Material-UI
- Vite
- Axios

## API Endpoints

- `GET /todos`: Get all todos
- `POST /todos`: Add a new todo
- `DELETE /todos/:id`: Delete a todo

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

