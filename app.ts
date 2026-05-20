import express from "express";
const app = express();
import recipesRouter from "./routes/recipesRouter.js";

app.use("/recipes", recipesRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server on http://localhost:${PORT}`)
});