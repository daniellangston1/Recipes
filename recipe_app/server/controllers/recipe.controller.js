const Recipe = require('../models/recipe.model');
const jwt = require("jsonwebtoken");

module.exports = {

createRecipe : (req, res) => {


    const newRecipeObj = new Recipe(req.body);

    const decodedJWT = jwt.decode(req.cookies.usertoken, {
        complete: true
    })

    newRecipeObj.createdBy = decodedJWT.payload.id;

    newRecipeObj.save(req.body)
    .then((newRecipe)=>{
        console.log(newRecipe)
        res.json(newRecipe);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
},

findAllRecipesByUser: (req, res)=>{
    Recipe.find({ createdBy: req.params.userId})
    .then((allUserRecipes)=>{
        console.log(allUserRecipes);
        res.json(allUserRecipes);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })

},


getOneRecipe : (req, res) => {
    Recipe.findById({_id: req.params.id})
    .then((oneRecipe)=>{
        console.log(oneRecipe)
        res.json(oneRecipe);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
},

getAllRecipes : (req, res) => {
    Recipe.find({})
    .populate("createdBy", "email")
    .then((allRecipes)=>{
        console.log(allRecipes)
        res.json(allRecipes);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
},

getRecipesByType : (req, res) => {
    Recipe.find({type: req.params.type})
    .then((recipesByType)=>{
        console.log(recipesByType)
        res.json(recipesByType)
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
},

deleteRecipe : (req, res) => {
    Recipe.deleteOne({ _id: req.params.id })
    .then((deletedRecipe)=>{
        console.log(deletedRecipe);
        res.json(deletedRecipe);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
},


editRecipe : (req, res) => {
    Recipe.findByIdAndUpdate({_id: req.params.id},
        req.body,
        {
            new: true,
            runValidators: true
        })
        .then((updatedRecipe)=>{
            res.json(updatedRecipe);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    }
}