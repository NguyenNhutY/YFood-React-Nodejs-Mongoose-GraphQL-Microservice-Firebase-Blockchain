import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    image: { type: String },
}, { 
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export default mongoose.model('Category', categorySchema);
