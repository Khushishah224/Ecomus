# Ecomus

Ecomus is a MERN (MongoDB, Express, React, Node.js) stack-based e-commerce application. This repository contains the client-side and server-side code for the project.

---

## Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/Khushishah224/Ecomus.git
cd Ecomus
```

### Step 2. Install Dependencies
Client-side
```bash
cd client
npm install
```
Server-side
-Open another terminal and navigate to the server folder
```bash
cd server 
npm install
```
### Step 3. Set Up Environment Variables
In the server folder, create a .env file and add the following variables
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Step 4. Start the server
Start the server in the terminal
```bash
cd server
npm start
# The server will run on http://localhost:5000

```
Start the client in the terminal
```bash
cd client 
npm start
# The client will run on http://localhost:3000

```

###Folder Structure
```
Ecomus/
├── client/       # Frontend code (React.js)
├── server/       # Backend code (Node.js, Express)
├── .gitignore    # Files and folders to ignore
├── README.md     # Project documentation
```

### Features

- Full-stack e-commerce application.
- MERN stack implementation with separate client and server.
- Authentication and authorization using JWT.

---

