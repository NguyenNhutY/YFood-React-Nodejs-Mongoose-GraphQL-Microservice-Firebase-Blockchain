import {gpl} from 'apollo-server-express'

const itemMaterialFoddSchema = gql`
type ItemMaterialFood  @key(fields: "id"){
id:ID!
material_batch_id:ID!;
mateiral_id: ID!
}

type ItemMaterialFoodResponse{
   success: Boolean
    message: String
    data: [ItemMaterialFood]
}

extend type Query{
  itemMaterialFoods: ItemMaterialFoodResponse
  getItemMaterialFoodById(id: ID!): ItemMaterialFoodResponse
  getItemMaterialFoodByMaterialId(material_id: ID!): ItemMaterialFoodResponse
  getItemMaterialFoodByFoodId(food_id: ID!): ItemMaterialFoodResponse
  }
  extend type Mutation{
  updateItemMaterialFood(id: ID!, mateiral_id: ID!, food_id: ID!): ItemMaterialFoodResponse!
  addItemMaterialFood(mateiral_id: ID!, food_id: ID!): ItemMaterialFoodResponse
  deleteItemMaterialFood(id: ID!): ItemMaterialFoodResponse
  }
`

export default itemMaterialFoddSchema