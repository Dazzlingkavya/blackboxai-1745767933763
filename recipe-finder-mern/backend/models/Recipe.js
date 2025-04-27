const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    required: true,
  },
  ingredients: [String],
  allergens: [String],
  views: {
    type: Number,
    default: 0,
  },
  instructions: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
