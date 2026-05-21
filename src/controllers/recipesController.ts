import type { Request, Response } from "express";
import * as recipesModel from "../models/recipesModel.js";
import type { Recipe, Ingredient } from "../types/recipeType.js";

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
    try {
        const { name, category, prepTime, cookTime, servings, ingredients, instructions } = req.body;
        
        // Parse ingredients by newline
        const rawIngredientsArray = (ingredients as string).split(/\r?\n/);

        const parsedIngredients: Ingredient[] = rawIngredientsArray
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map((item): Ingredient => {
                const match = item.match(/^([\d./]+)\s+(\w+)\s+(.+)$/);
                if (match) {
                    const [ , rawAmount = "", rawUnit = "", rawName = ""] = match;
                    let parsedAmount = 0;

                    if (rawAmount && rawAmount.includes("/")) {
                        const [num, denom] = rawAmount.split("/").map(Number);
                        if (num && denom) {
                            parsedAmount = num / denom;
                        } else {
                        parsedAmount = Number(rawAmount);
                        }
                    } else {
                        parsedAmount = Number(rawAmount);
                    }

                    return {
                            amount: Number(parsedAmount.toFixed(2)),
                            unit: rawUnit,
                            name: rawName,
                    };
                }
                return { amount: 0, unit: "pcs", name: item };
            });

        // Parse instructions by newline
        const parsedInstructions: string[] = (instructions as string)
            .split(/\r?\n/)
            .map(step => step.trim())
            .filter(step => step.length > 0);
        
        const newRecipe: Recipe = {
            id: Date.now().toString(),
            category,
            name,
            prepTime: prepTime ? Number(prepTime) : undefined,
            cookTime: cookTime ? Number(cookTime) : undefined,
            servings: Number(servings),
            ingredients: parsedIngredients,
            instructions: parsedInstructions
        };

        await recipesModel.saveRecipe(newRecipe);
        res.redirect(`/recipes/${newRecipe.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating recipe");
    }
};