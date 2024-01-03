// import React from "react";
import { FormEvent, useState } from "react";
import "./App.css";

import * as api from "./api";
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.searchRecipes(searchTerm, 1);
      setRecipes(response.results);
      console.log("api success: ", response)
    } catch (error) {
      console.log(error);
      return;
    }
  };

  console.log('render App')
  console.log('    searchTerm', searchTerm)
  console.log('    recipes', recipes)
  
  return (
    <div>
        <button type="button" onClick={handleSearchSubmit}>Submit</button>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            recipe image location: {recipe.image}
            recipe title: {recipe.title}
          </div>
        ))}
    </div>
  );
};

export default App;
