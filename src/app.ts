import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import recipesRouter from "./routes/recipesRouter.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/recipes", recipesRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server on http://localhost:${PORT}`)
});