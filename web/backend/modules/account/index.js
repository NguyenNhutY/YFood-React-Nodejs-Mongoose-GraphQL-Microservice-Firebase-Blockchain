import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../../config/db.js";
import { ApolloServer } from "apollo-server-express";
import accountSchema from './account.schema.js';
import accountResolver from "./account.resolver.js";
import { DateScalar } from "../../utils/custom.date.js";
import session from "express-session";
import jwt from 'jsonwebtoken';
import { buildSubgraphSchema } from "@apollo/subgraph";
import { makeExecutableSchema } from '@graphql-tools/schema';

const app = express();
const PORT = process.env.PORT || 4001;

// Connect to the database
connectDB();
const schema = buildSubgraphSchema({
  typeDefs: accountSchema,
  resolvers: {
    ...accountResolver,
    Date: DateScalar,
  } 
});
// Set up Apollo Server with subgraph schema
const server = new ApolloServer({
  schema,
  introspection: true, // Giữ introspection để có thể truy vấn schema từ localhost
  playground: true,    // Bật GraphQL Playground ở localhost
  tracing: false,      // Tắt Apollo Studio tracing
     name: "accounts"

});

// Set up CORS configuration to allow credentials
app.use(
  cors({
    origin: true,  // Allow cross-origin requests
    credentials: true,  // Allow cookies to be sent with requests
  })
);

app.use(express.json());

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start Apollo Server
server.start()
  .then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(PORT, () => {
      console.log(`Accounts service is running on http://localhost:${PORT}/graphql`);

    });
  })
  .catch((error) => {
    console.error('Gateway startup error:', error);
    console.error(error.extensions?.errors);
  });