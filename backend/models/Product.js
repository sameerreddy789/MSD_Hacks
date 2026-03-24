import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 500
  },
  longDescription: {
    type: String,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Browser Extensions', 'Productivity Widgets', 'AI Automation', 'Templates & Presets']
  },
  thumbnailURL: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  downloadURL: {
    type: String,
    default: ''
  },
  compatibility: {
    type: String,
    default: 'Universal'
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, featured: -1, createdAt: -1 });
productSchema.index({ slug: 1 });

export default mongoose.model('Product', productSchema);
