```


   *                                     (         )             )  (                   
 (  `           (              )         )\ )   ( /(   (      ( /(  )\ )    (           
 )\))(      )   )\ )   (    ( /(  (     (()/(   )\())  )\     )\())(()/(    )\      (   
((_)()\  ( /(  (()/(  ))\   )\()) )\ )   /(_)) ((_)\((((_)(  ((_)\  /(_))((((_)(    )\  
(_()((_) )(_))  ((_))/((_) ((_)\ (()/(  (_))_   _((_))\ _ )\  _((_)(_))   )\ _ )\  ((_) 
|  \/  |((_)_   _| |(_))   | |(_) )(_))  |   \ | || |(_)_\(_)| \| || _ \  (_)_\(_)_ | | 
| |\/| |/ _` |/ _` |/ -_)  | '_ \| || |  | |) || __ | / _ \  | .` ||   /   / _ \ | || | 
|_|  |_|\__,_|\__,_|\___|  |_.__/ \_, |  |___/ |_||_|/_/ \_\ |_|\_||_|_\  /_/ \_\ \__/  
                                  |__/                                                  

 _______                 __   _             ___        ____  _____               __        
|_   __ \               |  ] (_)          .' _ '.     |_   \|_   _|             |  ]       
  | |__) |  .---.   .--.| |  __   .--.    | (_) '___    |   \ | |   .--.    .--.| | .---.  
  |  __ /  / /__\\/ /'`\' | [  | ( (`\]   .`___'/ _/    | |\ \| | / .'`\ \/ /'`\' |/ /__\\ 
 _| |  \ \_| \__.,| \__/  |  | |  `'.'.  | (___)  \_   _| |_\   |_| \__. || \__/  || \__., 
|____| |___|'.__.' '.__.;__][___][\__) ) `._____.\__| |_____|\____|'.__.'  '.__.;__]'.__.' 
                                                                                           

```


# Todo & OTP App with Node, Redis, React, Material-UI, Vite, Axios

This is a todo and OTP application built with React, Node.js, Express.js, Nodemailer, Cors, Redis, Body-parser, Dotenv, Vite, Material-UI, and Axios.

## Features

- User can add, delete, and get tasks.
- Error handling for backend logic.
- OTP generation and email sending functionality.

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
   cd /redis
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   node ./app.js 
   ```
   `OR`
   ```bash
   nodemon ./app.js 
   ```

   The server will start at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd /client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173/`.


## Folder Structure

### Backend

```
.
├── client                  # Frontend logic with React and Vite
├── controllers         
│   ├── task.js             # Logic of tasks controllers
│   └── otp.js              # Logic of OTP controllers
│ 
├── routes
│   ├── task.js             # Logic of task routes
│   └── otp.js              # Logic of OTP routes
│  
├── utils
│   ├── email.js            # Nodemailer logic to send OTP via email
│   ├── errorHandler.js     # Custom error handling logic
│   ├── otpGen.js           # OTP generation logic
│   └── redisClient.js      # Redis database connection logic
│
├── templates                 
│   └── mailTemplate.js     # Custom HTML and CSS mail template for Nodemailer
│    
├── .env                    # Contains confidential keys 
├── .gitignore              # Git logic to ignore files 
├── package.json            # Contains all the packages information
└── README.md               # Documentation of code
```

### Frontend

```
.
├── public         
│   └── vite.svg                          
│ 
├── src
│   ├── assets             
│   │   └── react.svg              
│   │
│   ├── components
│   │   ├── Header.tsx       # Header React code
│   │   ├── Otp.tsx          # OTP page React code
│   │   ├── TaskForm.tsx     # Task Form React code
│   │   └── Tasks.tsx        # Show Task List React code
│   │
│   ├── App.css                           
│   ├── App.tsx              # Landing page React code 
│   ├── Home.tsx             # Landing page React code 
│   ├── index.css
│   ├── main.tsx             # Routes with react-router-dom 
│   ├── RootLayout           # Layout code for Header and footer
│   └── vite-env.d.ts        # Contains confidential keys
│    
├── .eslintrc.cjs           # Eslint config file
├── indes.html              # HTML page
├── tsconfig.json           # Typescript config file
├── .gitignore              # Git logic to ignore files 
├── package.json            # Contains all the packages information
└── README.md               # Documentation of code
```

## Installation

## Why List Data Structure for Redis Todo

In this project, we chose to use a list data structure in Redis to store our todo items. Here are the reasons for this choice:

1. **Ordering**: Lists in Redis maintain the order of elements, which is crucial for a todo application. This allows us to display the todos in the order they were added or modified.

2. **Efficient Operations**: Redis lists provide efficient operations for adding, removing, and accessing elements. This is important for the performance of our application, especially as the number of todos grows.

3. **Atomicity**: Redis list operations are atomic, meaning they either fully succeed or fail, even in a concurrent environment. This ensures the consistency of our todo list.

4. **Ease of Use**: Redis lists provide simple and intuitive commands for managing lists, making it easy to work with them in our application code.

Overall, using a list data structure in Redis is a suitable choice for our todo application due to its efficiency, ordering, atomicity, and ease of use.


```markdown
## Storing Task Objects in Redis
```

When adding a new task to the todo list, we first stringify the JSON object containing the task details (title, description, date) and then add it to the Redis list. This allows us to easily store and retrieve task objects in Redis.


### `Convert the task object to a JSON string:`

  ```javascript
     const task = { title: 'Task Title', description: 'Task Description', date: 'Task Date' };
     const jsonString = JSON.stringify(task);
```

```markdown
## 1. Add Task Api:
```

   ```javascript
   async function addTask(req, res) {
          try {
              const task = req.body.task;
              if (!task) {
                  handleBadRequestError(res, 'Task data is missing');
                  return;
              }
              await redisClient.rPush('tasks', JSON.stringify(task));
              res.send('Task added successfully');
          } catch (err) {
              handleServerError(res, err, 'Failed to add task');
          }
   }

   ```
   ```markdown
## 2. Delete Task Api:
```

   ```javascript
  async function deleteTask(req, res) {
    const id = req.params.id;
    try {
        await redisClient.lRem('tasks', 0, id);
        res.send('Task deleted successfully');
    } catch (err) {
        handleNotFoundError(res, 'Task not found');
    }
}

   ```
   ```markdown
## 3. Get Tasks Api:
```

   ```javascript
   async function getAllTasks(req, res) {
    try {
        const tasks = await redisClient.lRange('tasks', 0, -1);
        res.send(tasks || []);
    } catch (err) {
        handleServerError(res, err, 'Failed to get tasks');
    }
}

   ```


## Screenshots
   `OTP PAGE`
![Otp page](https://github.com/DHANRAJCHOUDHARY244/REDIS/blob/main/screenshots/otp.png)

   `Todo Page`
![Todo page](https://github.com/DHANRAJCHOUDHARY244/REDIS/blob/main/screenshots/todo.png)