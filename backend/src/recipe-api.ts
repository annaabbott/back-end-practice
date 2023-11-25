import config from "./config";

export const searchRecipes = async (searchTerm: string, page: number) => {
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
  console.log(`Searching for: ${url.toString()}`)

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
