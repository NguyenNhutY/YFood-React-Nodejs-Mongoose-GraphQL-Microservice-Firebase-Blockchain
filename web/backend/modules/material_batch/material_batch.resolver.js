import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql';
import MaterialBatch from './material_batch.model.js';
import Material from '../material/material.model.js';
import { ApolloError } from 'apollo-server-express';
import MaterialBatchService from './material_batch.service.js';

const materialBatchResolver = {
  MaterialBatch: {
    __resolveReference: (batch) => {
      // Fetch the complete MaterialBatch from the database or another source using batch._id
      return {
        _id: batch._id,
        material_id: "material_id_example", // Fetch actual value
        batch_code: "batch_code_example",   // Fetch actual value
        harvest_date: new Date(),
        expiry_date: new Date(),
        quantity: 100,
        quality_check_date: new Date(),
      };
    },
  },
    Query: {
      // Lấy tất cả lô nguyên liệu
      getAllMaterialBatches: async () => {
        try {
          const batches = await MaterialBatch.find();  // Ensure you're using correct model and query
  
          if (!batches || batches.length === 0) {
            return {
              success: true,
              message: 'Không có lô nguyên liệu nào',
              data: [],
            };
          }
  
          return {
            success: true,
            message: 'Lấy tất cả lô nguyên liệu thành công!',
            data: batches,
          };
        } catch (error) {
          console.error('Error in getAllMaterialBatches:', error);
          return {
            success: false,
            message: 'Lỗi khi lấy dữ liệu lô nguyên liệu',
            data: [],
          };
        }
      },
      
  
      // Lấy thông tin lô nguyên liệu theo ID
      getMaterialBatchById: async (_, { id }) => {
return await MaterialBatchService.getBatchById(id);
      },
      // Lấy lô nguyên liệu theo tên nguyên liệu
      getMaterialBatchesByMaterialName: async (_, { materialName }) => {  // Fixed the typo here too
        const batches = await MaterialBatchService.getBatchByMaterialName(materialName);
        return batches
      },
  
      // Lấy lô nguyên liệu theo ngày thu hoạch
      getMaterialBatchesByHarvestDate: async (_, { harvestDate }) => {
return await MaterialBatchService.getBatchByHarvestDate(harvestDate);
      },
  
      // Lấy lô nguyên liệu theo ngày hết hạn
      getMaterialBatchesByExpiryDate: async (_, { expiryDate }) => {
return await MaterialBatchService.getMaterialBatchesByExpiryDate(expiryDate)
      },
      // Lấy lô nguyên liệu theo ngày kiểm tra chất lượng
      getMaterialBatchesByQualityCheckDate: async (_, { qualityCheckDate }) => {
        return await MaterialBatchService.getMaterialBatchesByQualityCheckDate(qualityCheckDate)
      },
    },
    Mutation: {
      // Thêm một lô nguyên liệu mới
      addMaterialBatch: async (_, { material_name, batch_code, harvest_date, expiry_date, quality_check_date, quantity }) => {
        try {
          // Tìm nguyên liệu theo tên
          let material = await Material.findOne({ name: material_name });
          const checkBatch = await MaterialBatches.findOne({ batch_code: batch_code});
          if(checkBatch){
            return {
              success: false,
              message: 'Lô nguyên liệu với mã này đã tồn tại',
              data: [],
            };
          }
          // Nếu nguyên liệu không tồn tại, tạo mới
          if (!material) {
            material = new Material({
              name: material_name,
            });
            await material.save();
          }
          // Tạo mới một lô nguyên liệu
          const newMaterialBatch = new MaterialBatch({
            material_id: material._id,
            batch_code: batch_code,
            harvest_date: harvest_date,
            expiry_date: expiry_date,
            quality_check_date: quality_check_date,
            quantity: quantity,
          });
          // Lưu lô nguyên liệu vào cơ sở dữ liệu
          await newMaterialBatch.save();
    
          return {
            success: true,
            message: 'Thêm lô nguyên liệu thành công!',
            data: [  {
              ...newMaterialBatch.toObject(), // Chuyển đổi đối tượng mongoose thành đối tượng thuần JavaScript
              name_material: material.name,   // Thêm tên nguyên liệu vào data
            },],
          };
        } catch (error) {
          console.error(error);
          throw new ApolloError('Lỗi khi thêm lô nguyên liệu');
        }
      },
    },
  };
  

  
  
  export default materialBatchResolver;
