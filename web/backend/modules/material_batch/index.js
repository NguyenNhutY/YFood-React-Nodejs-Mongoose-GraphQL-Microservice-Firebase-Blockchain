import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure the correct path
import { ApolloServer } from "apollo-server-express";
import materialSchema from '../material/material.schema.js';  // Import material schema
import materialBatchSchema from "./material_batch.schema.js"; // Material batch schema
import materialBatchResolver from "./material_batch.resolver.js"; // Material batch resolvers
import { DateScalar } from "../../utils/custom.date.js";
import { Decimal } from "../../utils/custom.decimal.js";
import {buildSubgraphSchema} from "@apollo/subgraph"
const app = express();
const PORT = process.env.PORT || 4002;

// Connect to the database
connectDB();  // Ensure correct database connection logic

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: [materialSchema, materialBatchSchema], // Merge your typeDefs here
  resolvers: {
    ...materialBatchResolver,  // Your resolvers
    Date: DateScalar,
    Decimal: Decimal,
    
  },
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true, // Giữ introspection để có thể truy vấn schema từ localhost
  playground: true,    // Bật GraphQL Playground ở localhost
  tracing: false,      // Tắt Apollo Studio tracing 
  name: "materialBatches",
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
      console.log(`Material Batch service is running on http://localhost:${PORT}/graphql`);

    });
  })
  .catch((error) => {
    console.error('Gateway startup error:', error);
    console.error(error.extensions?.errors);
  });