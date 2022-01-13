const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
        required: [true, 'Must have the recipe name entered!'],
        minLength: [2, 'Must have at least 2 characters']
	},
    type: {
        type: String,
        required: [true, 'Your recipe must be a breakfast, lunch, dinner, dessert, or a snack!'],
        enum: [
            "Breakfast",
            "Lunch",
            "Dinner",
            "Dessert",
            "Snack", 
            "Drink"
        ]
    },
    instructions: {
        type: String,
        required: [true, 'Must have the recipe description entered!'],
        minLength: [3, 'Must have at least 3 characters']
    },

    ingredients: {
        type: String,
        required: [true, 'Must have the recipe ingredients entered!'],
        minLength: [3, 'Must have at least 3 characters']
    },

    nutrition: {
        type: String
    },
    
    rating: {
        type: Number,
        max: [10, "This is a 1-10 scale, 1 being the worst, 10 being the best."]
    },
    image: {
        type: String,
        required: [true, "We need images because we love them!"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
},{timestamps: true}
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;