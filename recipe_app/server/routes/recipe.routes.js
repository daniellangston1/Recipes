const RecipeController = require('../controllers/recipe.controller');

const {authenticate} = require("../config/jwt.config")

module.exports = (app) => {

    app.get('/api/recipes', RecipeController.getAllRecipes);
    app.post('/api/recipes', authenticate, RecipeController.createRecipe);
    app.put('/api/recipes/:id', RecipeController.editRecipe);
    app.delete('/api/recipes/:id', RecipeController.deleteRecipe);
    app.get('/api/recipes/:id', RecipeController.getOneRecipe);
    app.get('/api/recipes/type/:type', RecipeController.getRecipesByType);
    app.get("/api/user/recipes/:userId", RecipeController.findAllRecipesByUser);
}