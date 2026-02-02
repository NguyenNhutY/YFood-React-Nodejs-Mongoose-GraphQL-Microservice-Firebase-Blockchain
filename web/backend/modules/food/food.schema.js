import { gql } from "apollo-server-express";

const foodSchema = gql`
  scalar Upload

  input FoodInput {
    name: String!
    price: Float!
    description: String!
    image: String!   # Đây là hình ảnh (dạng base64 hoặc URL)
  category_name:String
    }

  type Food @key(fields: "id") {
    _id: ID
    name: String
    description: String
    price: Float
    item_metarial_food_id: String
    category_id: ID!
    image: String
    category_name:String

  }

  type FoodResponse {
    success: Boolean
    message: String
    data: [Food]
  }

  extend type Mutation {
    addFoods(foods: [FoodInput]!): FoodResponse!
  }

  extend type Query {
    listFood: FoodResponse
    getFoodById(_id: ID!): FoodResponse
    getFoodByCategory(category: String!): FoodResponse
    getFoodByMaterial(material: String!): FoodResponse
    getFoodByPriceRange(minPrice: Float!, maxPrice: Float!): [Food]
    getFoodByRating(rating: Float!): FoodResponse
    getFoodByPopularity(limit: Int): FoodResponse
    getFoodBySale(limit: Int): FoodResponse
  }
`;

export default foodSchema;
