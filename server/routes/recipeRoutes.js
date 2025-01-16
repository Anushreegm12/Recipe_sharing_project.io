const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes 
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

 
module.exports = router;

//const express = require('express');
//const router = express.Router();

// Route for the homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Route for the About page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Add other routes (like contact or recipes)
module.exports = router;
