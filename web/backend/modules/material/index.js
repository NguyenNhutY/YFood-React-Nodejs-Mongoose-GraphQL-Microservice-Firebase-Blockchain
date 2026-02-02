import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure the correct path
import { ApolloServer } from "apollo-server-express";
import materialSchema from './material.schema.js';  // Import material schema
import materialResolver from "./material.resolver.js"; // Material batch resolvers
import {buildSubgraphSchema} from "@apollo/subgraph";
import { DateScalar } from "../../utils/custom.date.js";

const app = express();
const PORT = process.env.PORT || 4003;

// Connect to the database
connectDB();  // Ensure correct database connection logic

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: [materialSchema], // Merge your typeDefs here
  resolvers: {
    ...materialResolver,  // Your resolvers
  }, Date: DateScalar
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true, // Giữ introspection để có thể truy vấn schema từ localhost
  playground: true,    // Bật GraphQL Playground ở localhost
  tracing: false,      // Tắt Apollo Studio tracing 
  name: "material",
  formatError: (error) => {
    console.error(error); // Log errors for debugging
    return error;
  }
});

// Configure CORS
app.use(
  cors({
    origin: true,  // Enable CORS for all origins (or specify frontend URL)
    credentials: true, // Enable session handling with credentials
  })
);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the Apollo Server
server.start()
  .then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(PORT, () => {
      console.log(`Material service is running on http://localhost:${PORT}/graphql`);

    });
  })
  .catch((error) => {
    console.error('Gateway startup error:', error);
    console.error(error.extensions?.errors);
  });