import express from "express";
import cors from "cors";

import * as RecipeAPI from "./recipe-api";
import config from "./config";
import { PrismaClient } from "@prisma/client";

import { getFavoriteRecipesByIds } from "./recipe-api";

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body;
  // console.log("req.body", req.body)
  try {
    const favoriteRecipe = await prismaClient.favoriteRecipes.create({
      data: { recipeId },
    });
    res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.log("##### error", error)
    if ((error as any).code==='P2002') {
      res
        .status(409)
        .json({ error: "Status 409: Recipe object already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Status 500: Something went wrong." });
    }
  }
});

app.get("/api/recipes/search", async (req, res) => {
  console.log("handler for /api/recipes/search");
  const searchTerm = req.query.searchTerm as string;
  console.log("    searchTerm", searchTerm);
  const page = parseInt(req.query.page as string);
  console.log("    page", page);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res, next) => {
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
});

app.listen(config.port, () => {
  console.log(`Server running on localhost:${config.port}`);
});

app.get("/api/recipes/favorite", async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favoriteRecipes.findMany();
    const recipeIds = favoriteRecipes.map((recipe) =>
      recipe.recipeId.toString()
    );
    const favorites = await getFavoriteRecipesByIds(recipeIds);
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "status 500: something went wrong." });
  }
});

app.delete("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    await prismaClient.favoriteRecipes.delete({
      where: { recipeId },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Status 500: something went wrong" });
  }
});
