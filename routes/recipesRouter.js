const { Router } = require("express");
const recipesRouter = Router();

//Mock data
const recipes = [
    { id: 1, name: "Pancakes" },
    { id: 2, name: "Omeletes" }
];

recipesRouter.get("/", (req, res) => {
    res.send("This is the Recipes Page");
});

recipesRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const recipe = recipes.find(r => r.id === parseInt(id));

    if (!recipe) {
        return res.status(404).send("Recipe not found");
    }
    res.json(recipe);
});

recipesRouter.post("/", (req, res) => {
    res.send("Recipe Received!");
});

module.exports = recipesRouter;