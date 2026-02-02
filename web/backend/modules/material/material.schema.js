import { gql } from 'apollo-server-express';

const materialSchema = gql`
# materialSchema.graphql (Material service)
 scalar Date
scalar Decimal


type Material @key(fields: "id") {
  id: ID! 
  name: String!
  description: String
}

type MaterialResponse {
  success: Boolean! 
  message: String! 
  dataMaterial: [Material]  
}

type Query {
  listMaterial: MaterialResponse!
  getMaterialById(id: ID!): MaterialResponse!
  getMaterialByName(name: String!): MaterialResponse!
}

type Mutation {
  deleteMaterial(id: ID!): [MaterialResponse]!
  updateMaterial(id: ID!, name: String!, description: String!): MaterialResponse!
  createMaterial(name: String!, description: String!): MaterialResponse!
}

`;

export default materialSchema;
