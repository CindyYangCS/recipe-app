import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Recipe } from "../types/recipeType.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../recipes.json");

export const readAllRecipes = async (): Promise<Recipe[]> => {
    const rawData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(rawData);
};

export const saveRecipe = async (newRecipe: Recipe): Promise<void> => {
    const recipes = await readAllRecipes();
    recipes.push(newRecipe);
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 2), "utf-8");
};