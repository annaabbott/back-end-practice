import express from "express";
import cors from "cors";

import * as RecipeAPI from "./recipe-api";
import config from "./config";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  console.log("handler for /api/recipes/search")
  const searchTerm = req.query.searchTerm as string;
  console.log("    searchTerm", searchTerm)
  const page = parseInt(req.query.page as string);
  console.log("    page", page)
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary",async (req, res, next) => {
  // const recipeId = req.params.recipeId;
  // const results = await RecipeAPI.getRecipeSummary(recipeId)
  // return res.json(results);
  try {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
})

app.listen(config.port, () => {
  console.log(`Server running on localhost:${config.port}`);
});
