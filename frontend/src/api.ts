export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL(`http://localhost:3000/api/recipes/search`);
  //baseUrl.searchParams.append("_", new Date().getTime().toString())
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", page.toString());

  const searchResponse = await fetch(baseUrl.toString());
  if (!searchResponse.ok) {
    throw new Error(`HTTP error! Status: ${searchResponse.status}`);
  }
  return searchResponse.json();
};

export async function fetchRecipeSummary (recipeId: string) {
  try {
    const baseUrl = `http://localhost:3000/api/recipes/${recipeId}/summary`;
    const searchResponse = await fetch(baseUrl.toString());
    if (!searchResponse.ok) {
      throw new Error(`HTTP error! Status: ${searchResponse.status}`);
    }
    const response = await searchResponse.json();
    console.log("fetchRecipeSummaryResponse", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
