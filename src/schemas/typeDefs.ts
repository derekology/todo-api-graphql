import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
  }

  type Task {
    _id: ID!
    owner: String!
    name: String!
    description: String!
    category: String!
  }

  input TaskInput {
    owner: String!
    name: String!
    description: String!
    category: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getAllTasks: [Task]
    searchTasks(owner: String, name: String, category: String, operator: String): [Task]
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    addTask(taskInput: TaskInput!): Task
    deleteTask(id: ID!, userId: String!): String
    updateTask(id: ID!, userId: String, category: String, name: String, description: String): Task
  }
`;

export default typeDefs;
