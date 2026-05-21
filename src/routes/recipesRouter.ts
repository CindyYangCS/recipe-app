import { Router } from "express";
import type { Request, Response } from "express";
import * as recipesController from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get("/new", (req: Request, res: Response) => res.render("createRecipeForm"));
recipesRouter.post("/new", recipesController.createRecipe);
recipesRouter.get("/", recipesController.getAllRecipes);
recipesRouter.get("/:id", recipesController.getRecipeById);

export default recipesRouter;