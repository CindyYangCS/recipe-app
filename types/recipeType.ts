export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Recipe {
    id: string;
    category: string;
    name: string;
    prepTime?: number;
    cookTime?: number;
    servings: number;
    ingredients: Ingredient[];
    instructions: string[];
}

function scaleRecipe(recipe: Recipe, newServings: number): Recipe {
    const factor = newServings / recipe.servings;

    return {
        ...recipe,
        servings: newServings,
        ingredients: recipe.ingredients.map(ingredient => ({
            ...ingredient,
            amount: ingredient.amount * factor
        }))
    };
}