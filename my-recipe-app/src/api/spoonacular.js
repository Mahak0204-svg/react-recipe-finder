const API_KEY = '37e9e9dc93c24c95afc1bbeff6ba2742';

/**
 * Fetches recipes based on a search query.
 * @param {string} query - The search term for recipes.
 * @returns {Promise<Array>} A promise that resolves to an array of recipe objects.
 */
export async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return []; // Return an empty array on error
    }
}

/**
 * Fetches detailed information for a specific recipe.
 * @param {number} recipeId - The ID of the recipe.
 * @returns {Promise<Object>} A promise that resolves to a single recipe detail object.
 */
export async function fetchRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null; // Return null on error
    }
}
