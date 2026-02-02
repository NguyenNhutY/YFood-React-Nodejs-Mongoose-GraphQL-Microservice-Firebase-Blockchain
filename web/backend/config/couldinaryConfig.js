import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load biến môi trường
dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Lấy __dirname bằng import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Hàm tải lên video/hình ảnh


// Hàm tải lên tất cả hình ảnh trong thư mục uploads
export async function uploadAllImages() {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');  // Đường dẫn thư mục uploads
    const files = fs.readdirSync(uploadsDir);  // Đọc danh sách các tệp trong thư mục

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);  // Đường dẫn đầy đủ đến tệp

      // Kiểm tra nếu tệp là hình ảnh (tùy chỉnh theo phần mở rộng file)
      if (file.match(/\.(png|jpg|jpeg|gif)$/)) {
        const imageUrl = await uploadFile(filePath, "image");  // Tải lên Cloudinary
        console.log(`URL của ${file}: ${imageUrl}`);
      }
    }
  } catch (error) {
    console.error("Lỗi khi tải lên tất cả hình ảnh:", error);
  }
}

