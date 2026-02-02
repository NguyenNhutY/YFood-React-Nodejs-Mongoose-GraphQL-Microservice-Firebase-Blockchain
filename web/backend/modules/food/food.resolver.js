// resolvers.js
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import Food from "./food.model.js";
import Category from "../category/category.model.js";
import Material from "../material/material.model.js";
import Material_Batch from "../material_batch/material_batch.model.js";
import FoodService from "./food.service.js"


import fs from 'fs';

const foodResolver = {
  Query: {
    listFood: async (_, {}) => {
      return await FoodService.listFood();
     },
    food: async (_, { searchQuery }) => {
      try {
        const foods = await Food.find({ name: { $regex: searchQuery, $options: "i" } });
        return { success: true, data: foods };
      } catch (error) {
        throw new ApolloError("Failed to search foods");
      }},
      getFoodById: async (_, { _id }) => {
        try {
          // Check if the provided _id is a valid MongoDB ObjectId

          console.log('Querying with _id:', _id);
          const food = await Food.findById(_id);
          // Fetch food from the database

      
          // Check if food exists
          if (food) {
            return {
              success: true,
              data: food,
              message: "Get Food By ID successfully",
            };
          } else {
            throw new ApolloError("Food not found", "FOOD_NOT_FOUND");
          }
        } catch (error) {
          console.error("Error fetching food by ID:", error);  // Log error for debugging
          throw new ApolloError("Failed to fetch food", "INTERNAL_ERROR");
        }
      },
    getFoodByCategory : async () => {
        try {
          const foods = await Category.find({  });
          return ({ success: true, data: foods });
        } catch (error) {
          console.error(error);
          return({ success: false, message: "Error" });
        }
      },
  },
  Mutation: {
    addFoods: async (_, { foods }) => {
      if (!foods || foods.length === 0) {
        throw new Error("No foods provided");
      }
    
      console.log("Array check:", Array.isArray(foods));
    
      if (Array.isArray(foods)) {
        const foodNames = foods.map(food => food.name);
        const existingFoods = await Food.find({ name: { $in: foodNames } });
    
        if (existingFoods.length > 0) {
          throw new ApolloError("Some foods already exist");
        }
    
        try {
          const foodPromises = foods.map(async (food) => {
            if (!food.image) {
              throw new ApolloError("Image is required for all foods");
            }
            console.log("Image received:", food.image);
    
            // Kiểm tra sự tồn tại của category trước khi tạo mới
            let category = await Category.findOne({ name: food.category_name });
            if (!category) {
              // Nếu không tồn tại, tạo category mới
              category = new Category({
                name: food.category_name,
              });
              const savedCategory = await category.save();
              if (!savedCategory) {
                throw new ApolloError("Failed to create category");
              }
            }
    
            return new Food({
              name: food.name,
              price: food.price,
              description: food.description,
              category_name: category.name,  // Lưu ID của category

              image: food.image,
              category_id: category._id,  // Lưu ID của category
            });
          });
    
          const newFoods = await Promise.all(foodPromises);
          const savedFoods = await Food.insertMany(newFoods);
    
          return {
            success: true,
            message: "Foods added successfully",
            data: savedFoods,
          };
        } catch (error) {
          console.error("Error adding foods:", error);
          throw new ApolloError("Error adding foods", error.message);
        }
      } else {
        const { name, price, description, image, category_name } = foods;
    
        if (!image) {
          throw new ApolloError("Image is required");
        }
        if (!name || !price || !description || !category_name) {
          throw new ApolloError("All fields are required");
        }
    
        try {
          const existingFood = await Food.findOne({ name });
          if (existingFood) {
            throw new ApolloError("Food already exists");
          }
    
          // Kiểm tra sự tồn tại của category trước khi tạo mới
          let category = await Category.findOne({ name: category_name });
          if (!category) {
            category = new Category({ name: category_name });
            await category.save();
          }
    
          const newFood = new Food({
            name,
            price,
            description,
            image,
            category_id: category._id,  // Lưu ID của category
          });
    
          const savedFood = await newFood.save();
          return {
            success: true,
            message: "Food added successfully",
            data: savedFood,
          };
        } catch (error) {
          console.error("Error adding food:", error);
          throw new ApolloError("Error adding food", error.message);
        }
      }
    },
    
    
    
      
    removeFood : async () => {
        try {
          const food = await foodModel.findById(req.body._id);
          if (food?.image) {
            fs.unlinkSync(`uploads/${food.image}`);
          }
          await foodModel.findByIdAndDelete(req.body._id);
          res.json({ success: true, message: "Food deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Error" });
        }
      },
      
    updateFood : async () => {
        try {
          const food = await foodModel.findById(req.body._id);
          if (req.file) {
            if (food?.image) {
              fs.unlinkSync(`uploads/${food.image}`);
            }
            food.image = req.file.filename;
          }
          if (food) {
            food.name = req.body.name ?? food.name;
            food.description = req.body.description ?? food.description;
            food.price = req.body.price ?? food.price;
            food.category = req.body.category ?? food.category;
            food.metail_1 = req.body.metail_1 ?? food.metail_1;
            food.metail_2 = req.body.metail_2 ?? food.metail_2;
            food.metail_3 = req.body.metail_3 ?? food.metail_3;
            await food.save();
            res.json({ success: true, message: "Food updated successfully" });
          } else {
            res.status(404).json({ success: false, message: "Food not found" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Error" });
        }
      },
      
      
    searchFood : async () => {
        try {
          const searchQuery = req.query.search || "";
          if (!searchQuery.trim()) {
            res
              .status(400)
              .json({ success: false, message: "Search query cannot be empty" });
            return;
          }
          const foods = await foodModel.find({
            $or: [{ name: { $regex: searchQuery, $options: "i" } }],
          });
          res.status(200).json({ success: true, data: foods });
        } catch (error) {
          console.error("Search error:", error);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      },
      
 countFood : async () => {
        try {
          const count = await foodModel.countDocuments({});
          res.json({ success: true, count });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    averageFood : async () => {
        try {
          const result = await foodModel.aggregate([
            {
              $group: {
                _id: null,
                averagePrice: { $avg: "$price" },
              },
            },
          ]);
          res.json({ success: true, averagePrice: result[0]?.averagePrice || 0 });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    groupedFood : async () => {
        try {
          const result = await foodModel.aggregate([
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 },
              },
            },
          ]);
          res.json({ success: true, data: result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
      filterFood : async () => {
        const { minPrice, maxPrice, category } = req.query;
        try {
          const query = {};
          if (minPrice) query.price = { $gte: minPrice };
          if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
          if (category) query.category = category;
          const foods = await foodModel.find(query);
          res.json({ success: true, data: foods });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    sortFood : async () => {
        const { sortBy, order } = req.query;
        try {
          const sortOptions = {};
          sortOptions[sortBy ?? ""] = order === "asc" ? 1 : -1;
          const foods = await foodModel.find({}).sort(sortOptions);
          res.json({ success: true, data: foods });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    paginateFood : async () => {
        try {
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const skip = (page - 1) * limit;
      
          const foods = await foodModel.find({}).skip(skip).limit(limit);
      
          const totalItems = await foodModel.countDocuments({});
          const totalPages = Math.ceil(totalItems / limit);
      
          res.json({
            success: true,
            data: foods,
            pagination: {
              totalItems,
              totalPages,
              currentPage: page,
              itemsPerPage: limit,
            },
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    recommendFood : async () => {
        const { category } = req.query;
      
        try {
          if (!category) {
            res.status(400).json({
              success: false,
              message: "Category query parameter is required",
            });
            return;
          }
      
          const recommendations = await foodModel.find({ category }).limit(5); // Limit the number of recommendations
      
          res.json({
            success: true,
            data: recommendations,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      }
  }
}

export default foodResolver;
