import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
