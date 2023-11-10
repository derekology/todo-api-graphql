# Simple To-Do List Backend (GraphQL)

This is a simple to-do list backend built using Node.js, Express.js, and MongoDB. It provides basic functionality for user registration, authentication, and task management. The application uses Joi for request validation and bcrypt for password hashing.

## Getting Started

### Prerequisites

Before you can run this project, make sure you have the following dependencies installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/derekology/todo-api-graphql.git
   cd todo-api-graphql
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the project root and configure your environment variables.

   ```dotenv
   MONGODB_CLUSTER=<your_mongodb_cluster>
   MONGODB_USER=<your_mongodb_username>
   MONGODB_PASSWORD=<your_mongodb_password>
   MONGODB_DATABASE=<your_database_name>
   PORT=<your_desired_port>
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will start on the specified port or default to 3000 if another port is not specified in server.js.

## GraphQL Operations

### Authentication

#### Register a User

Registers a new user with the provided email and password.

```graphql
mutation {
  register(email: "user@example.com", password: "yourpassword") {
    _id
    email
  }
}
```

#### Login

Logs in a user with the provided email and password.

```graphql
mutation {
  login(email: "user@example.com", password: "yourpassword") {
    _id
    email
  }
}
```

### Task Management

#### Get All Tasks

Retrieves a list of all tasks.

```graphql
query {
  getAllTasks {
    _id
    owner
    name
    description
    category
  }
}
```

#### Search Tasks

Searches for tasks based on specified filters.

```graphql
query {
  searchTasks(
    owner: "userId"
    name: "taskName"
    category: "taskCategory"
    operator: "and/or"
  ) {
    _id
    owner
    name
    description
    category
  }
}
```

#### Add a Task

Adds a new task.

```graphql
mutation {
  addTask(
    taskInput: {
      owner: "userId"
      name: "taskName"
      description: "taskDescription"
      category: "Cleaning/Shopping/Work"
    }
  ) {
    _id
    owner
    name
    description
    category
  }
}
```

#### Delete a Task

Deletes a task with the specified task ID.

```graphql
mutation {
  deleteTask(id: "taskId", userId: "userId")
}
```

#### Update a Task

Updates a task with the specified task ID.

```graphql
mutation {
  updateTask(
    id: "taskId"
    userId: "userId"
    category: "newCategory"
    name: "newName"
    description: "newDescription"
  ) {
    _id
    owner
    name
    description
    category
  }
}
```

## Error Handling

This API provides error responses with appropriate error messages for various scenarios, such as validation errors, duplicate email addresses during registration, and unauthorized access.

## Project Structure

```
┣ src
┃ ┣ models
┃ ┃ ┣ taskModel.ts                   // data model for task objects
┃ ┃ ┗ userModel.ts                   // data model for user objects
┃ ┣ resolvers
┃ ┃ ┣ authResolvers.ts               // resolvers for authentication tasks
┃ ┃ ┗ taskResolvers.ts               // resolvers for task-related tasks
┃ ┣ schemas
┃ ┃ ┣ interfaces.ts                  // ts type definitions
┃ ┃ ┣ typeDefs.ts                    // graphql type definitions
┃ ┃ ┗ validationSchemas.ts           // validation for auth/task objects
┃ ┗ resolvers.ts                     // consolidated resolvers
┣ .gitignore
┣ package-lock.json
┣ package.json
┣ README.md
┣ server.ts                          // entry point for application
┗ tsconfig.ts
```
