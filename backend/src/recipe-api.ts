import config from "./config";

export const searchRecipes = async (searchTerm: string, page: number) => {
  console.log("searchRecipes handler");
  if (!config.apiKey) {
    throw new Error("API key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey: config.apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();
  console.log(`Searching for: ${url.toString()}`);

  try {
    const searchResponse = await fetch(url);
    if (!searchResponse.ok) {
      throw new Error(`HTTP error! Status: ${searchResponse.status}`);
    }
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!config.apiKey) {
    throw new Error("API key not found");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const params = {
    apiKey: config.apiKey
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      // Check for 4xx and 5xx errors
      let errorMessage = `HTTP error! Status: ${response.status}`;

      if (response.status >= 400 && response.status < 500) {
        errorMessage += "\nClient error";
      } else if (response.status >= 500 && response.status < 600) {
        errorMessage += "\nServer error";
      }

      throw new Error(errorMessage);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    // Handle other types of errors (e.g., network errors)
    console.error("Fetch error:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};
