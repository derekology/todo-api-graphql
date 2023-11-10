import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/schemas/typeDefs';
import resolvers from './src/resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;
const DB_URL: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_DATABASE}/todo-api?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to the database.`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit();
  }
};

const startServer = async () => {
  await connectToDatabase();

  const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`Apollo Server listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startServer().catch(err => console.error(err));