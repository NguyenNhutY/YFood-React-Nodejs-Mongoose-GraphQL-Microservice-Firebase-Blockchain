import express from 'express';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express'; // import từ apollo-server-express
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import axios from 'axios';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: '*', // Tạm thời cho phép tất cả để kiểm tra
  credentials: true,
}));

// Cấu hình Apollo Gateway
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'accounts',
        url: 'http://localhost:4001/graphql',  // Ensure this URL is correct
      },

      {
        name: 'material',
        url: 'http://localhost:4003/graphql',
      }  
    ],    introspectionOptions: {
      pollIntervalInMs: 10000 // Tăng thời gian poll
    },
    introspection: true, // Giữ introspection để có thể truy vấn schema từ localhost
    playground: true,    // Bật GraphQL Playground ở localhost
    tracing: false,      // Tắt Apollo Studio tracing 
    debug: true,
  }),

  logger: {
    log: (message) => console.log(message),
    info: (message) => console.info(message),
    warn: (message) => console.warn(message),
    error: (message) => console.error(message),
    debug: (message) => console.debug(message),
 
    plugins: [
      {
        requestDidStart(requestContext) {
          console.log('Request started! Query:\n' + requestContext.request.query);
        },
        willSendResponse(requestContext) {
          console.log('Response sent:', requestContext.response);
        },
      },
    ],
  },
  cache: new InMemoryLRUCache(),
  onHealthCheck: async () => {
    try {
      await axios.get('http://localhost:4001/graphql');
      console.log('Subgraph 1 is up');
    } catch (err) {
      console.error('Subgraph 1 error:', err.message);
    }

    try {
      await axios.get('http://localhost:4002/graphql');
      console.log('Subgraph 2 is up');
    } catch (err) {
      console.error('Subgraph 2 error:', err.message);
    }
    try {
      await axios.get('http://localhost:4003/graphql');
      console.log('Subgraph 3 is up');
    } catch (err) {
      console.error('Subgraph 3 error:', err.message);
    }
  },
});

// Cấu hình Apollo Server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

// Khởi động Apollo Server và áp dụng middleware Express
server.start().then(() => {
  // Sử dụng server.applyMiddleware() từ apollo-server-express
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the express server
  app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}/graphql`);
  });
}) .catch((error) => {
  console.error('Gateway startup error:', error);
});
