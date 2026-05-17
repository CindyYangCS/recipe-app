interface Ingredient {
    name: string;
    amount: number;
    unit: string;
    isOptional: boolean;
}

interface Recipe {
    id: string;
    category: string;
    name: string;
    prepTime?: number;
    cookTime?: number;
    servings: number;
    ingredients: Ingredient[];
    instructions: string[];
}