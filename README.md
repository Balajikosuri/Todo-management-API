## Note :

Plese Note that ,Every response belongs to a specific logged-in user only. response varies or differs from user to user.

# Todo Management API

This is a simple Todo Management API built with Node.js, Express, and MongoDB. The API allows users to perform CRUD operations on their own todos after authentication.


# Postman For Examples

https://app.getpostman.com/join-team?invite_code=88362fc5d83fbf55a45139e78ce5f2b6&target_code=04110fbd37fc5d9710240603103a4a90




## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Balajikosuri/Todo-management-API/tree/master
   ```

2. Install dependencies:

   ```bash
   cd <root folder>
   npm install
   ```

3. Set up MongoDB:

   - Create a MongoDB Atlas account (https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and obtain the connection URI.
   - Replace the MongoDB URI in `app.js` with your connection URI.

4. Set up JWT Secret:

   - Open `app.js` and replace `"your_secret_key"` with a secret key of your choice.

5. Run the application:

   ```bash
   npm start
   ```

## Usage

### Sign Up

**Endpoint:** POST users/signup

**Request:**

```http
POST http://localhost:3000/users/signup
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### Log In

**Endpoint:** POST /login

**Request:**

```http
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**

```json
{
  "JWT_token": "your_jwt_token"
}
```

### Create a Todo

**Endpoint:** POST /todos/add-todo

**Request:**

```http
POST http://localhost:3000/todos/add-todo
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "title": "Sample Todo",
  "description": "This is a sample todo.",
  "due_date": "2023-12-31T23:59:59Z",
  "priority": "high"
}
```

**Response:**

```json
{
  "_id": "your_todo_id",
  "title": "Sample Todo",
  "description": "This is a sample todo.",
  "due_date": "2023-12-31T23:59:59.000Z",
  "priority": "high",
  "completed": false,
  "createdAt": "your_timestamp",
  "updatedAt": "your_timestamp",
  "createdBy": "your_user_id"
}
```

### Get All Todos

**Endpoint:** GET /todos/get-all-todos

**Request:**

```http
GET http://localhost:3000/todos/get-all-todos
Authorization: Bearer your_jwt_token
```

**Response:**

```json
[
  {
    "_id": "your_todo_id",
    "title": "Sample Todo",
    "description": "This is a sample todo.",
    "due_date": "2023-12-31T23:59:59.000Z",
    "priority": "high",
    "completed": false,
    "createdAt": "your_timestamp",
    "updatedAt": "your_timestamp",
    "createdBy": "your_user_id"
  }
  // Other todos...
]
```

### Get a Specific Todo by ID

**Endpoint:** GET /todos/get-todo/:id

**Request:**

```http
GET http://localhost:3000/todos/get-todo/your_todo_id
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
  "_id": "your_todo_id",
  "title": "Sample Todo",
  "description": "This is a sample todo.",
  "due_date": "2023-12-31T23:59:59.000Z",
  "priority": "high",
  "completed": false,
  "createdAt": "your_timestamp",
  "updatedAt": "your_timestamp",
  "createdBy": "your_user_id"
}
```

### Update Todo by ID

**Endpoint:** PUT /todos/update-todo/:id

**Request:**

```http
PUT http://localhost:3000/todos/update-todo/your_todo_id
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "title": "Updated Todo",
  "priority": "medium"
}
```

**Response:**

```json
{
  "_id": "your_todo_id",
  "title": "Updated Todo",
  "description": "This is a sample todo.",
  "due_date": "2023-12-31T23:59:59.000Z",
  "priority": "medium",
  "completed": false,
  "createdAt": "your_timestamp",
  "updatedAt": "your_updated_timestamp",
  "createdBy": "your_user_id"
}
```

### Delete Todo by ID

**Endpoint:** DELETE /todos/delete-todo/:id

**Request:**

```http
DELETE http://localhost:3000/todos/delete-todo/your_todo_id
Authorization: Bearer your_jwt_token
```

\*\*

Response:\*\*

```json
{
  "message": "Todo deleted successfully"
}
```
