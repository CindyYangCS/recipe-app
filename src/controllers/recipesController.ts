import type { Request, Response } from "express";
import * as recipesModel from "../models/recipesModel.js";

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await recipesModel.readAllRecipes();
        res.render("recipes", { recipeList: recipes });
    } catch (error) {
        res.status(404).send("Error loading recipes");
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    const recipes = await recipesModel.readAllRecipes();
    const recipeId = req.params.id;

    const foundRecipe = recipes.find(recipe => recipe.id === recipeId);

    if (!foundRecipe) {
        return res.status(404).send("Recipe not found");
    }

    res.render("recipeDetails", { recipe: foundRecipe });
};

export const createRecipe = async (req: Request, res: Response) => {
    res.send("Recipe Created");
}