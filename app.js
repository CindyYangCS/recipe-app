const express = require("express");
const app = express();
const recipesRouter = require("./routes/recipesRouter");

app.use("/recipes", recipesRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server on http://localhost:${PORT}`)
});