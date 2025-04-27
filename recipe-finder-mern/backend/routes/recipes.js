const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// GET /api/recipes?cuisine=&dishType=&excludeAllergens=
router.get('/', async (req, res) => {
  try {
    const { cuisine, dishType, excludeAllergens } = req.query;

    let filter = {};

    if (cuisine) {
      filter.cuisine = { $regex: new RegExp(cuisine, 'i') };
    }
    if (dishType) {
      filter.dishType = { $regex: new RegExp(dishType, 'i') };
    }
    if (excludeAllergens) {
      const allergensArray = excludeAllergens.split(',').map(a => a.trim());
      filter.allergens = { $nin: allergensArray };
    }

    const recipes = await Recipe.find(filter).sort({ views: -1 });

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/recipes/random
router.get('/random', async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ msg: 'No recipes found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
