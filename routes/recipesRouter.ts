import { Router } from "express";
import type { Request, Response } from "express";
import * as recipesController from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get("/", (req: Request, res: Response) => {
    res.send("This is the Recipes Page");
});

//recipesRouter.get("/:id", recipesController.getRecipeById);

recipesRouter.post("/", (req: Request, res: Response) => {
    res.send("Recipe Received!");
});

export default recipesRouter;