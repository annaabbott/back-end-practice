// import React from "react";
import { FormEvent, useState, useRef } from "react";
import "./App.css";


import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNum = useRef(1);
  const [selectedRecipe, setSelectedRecipe] = useState < Recipe | undefined > (undefined);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.searchRecipes(searchTerm, 1);
      setRecipes(response.results);
      console.log("api success: ", response);
      pageNum.current = 1;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  console.log("render App");
  console.log("    searchTerm", searchTerm);
  console.log("    recipes", recipes);

  const handleViewMoreClick = async () => {
    const nextPage = pageNum.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results])
      pageNum.current = nextPage
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        required
        placeholder="Enter a search term"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      ></input>
      <button type="button" onClick={handleSearchSubmit}>
        Submit
      </button>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard  key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
      ))}

      <button className="viewMoreBtn" onClick={handleViewMoreClick}>View More</button>
      {selectedRecipe ?
        <RecipeModal
          recipeId={selectedRecipe.id.toString()} 
          onClose={() => setSelectedRecipe(undefined)}
          /> : null
      }
    </div>
  );
};

export default App;
