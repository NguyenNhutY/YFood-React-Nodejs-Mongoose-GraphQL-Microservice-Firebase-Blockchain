import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure correct path
import { ApolloServer } from "apollo-server-express";
import foodSchema from './food.schema.js';  // Import material schema
import foodResolver from "./food.resolver.js"; // Material batch resolvers
import { buildSubgraphSchema } from "@apollo/subgraph";
import { uploadAllImages } from '../../config/couldinaryConfig.js';  // Import hàm uploadAllImages

const app = express();
const PORT = process.env.PORT || 4004;

// Connect to the database
connectDB();  // Ensure correct database connection logic


// Apply middleware for file uploads before Apollo Server middleware

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: foodSchema,  // Merge your typeDefs here
  resolvers: foodResolver,  // Your resolvers
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,

  introspection: true, // Allow introspection for localhost
  playground: true,    // Enable GraphQL Playground for localhost
  tracing: false,      // Disable Apollo Studio tracing
  name: "food",
  formatError: (error) => {
    console.error(error); // Log errors for debugging
    return error;
  },
});

async function startServer() {
  // Start the Apollo Server
  await server.start();

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: "/graphql" });

  // Start the Express app
  app.listen(PORT, () => {
    console.log(`Food service is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();  // Call the async function to start the server
