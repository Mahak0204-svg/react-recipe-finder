import React, { useState } from 'react';
import SearchForm from './components/SearchForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import { fetchRecipes, fetchRecipeDetails } from './api/spoonacular.js'; // Ensure .js for non-JSX files

/**
 * App Component
 * The main component of the Recipe Finder application.
 * Manages global state for search results and recipe details.
 */
function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has been performed

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true); // Set to true after the first search attempt
    setRecipes([]); // Clear previous recipes immediately on new search
    setSelectedRecipe(null); // Close details when a new search starts

    try {
      const fetchedRecipes = await fetchRecipes(query);
      setRecipes(fetchedRecipes);
      if (fetchedRecipes.length === 0 && query !== "") { // Only show 'no recipes' if query was not empty
        setError("No recipes found for your search. Try a different keyword!");
      }
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setError("Oops! Failed to fetch recipes. Please check your internet connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (recipeId) => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchRecipeDetails(recipeId);
      setSelectedRecipe(details);
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
      setError("Could not load recipe details. It might be unavailable or there's a network issue.");
      setSelectedRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
    setError(null); // Clear errors when closing details
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-5 bg-[#4a3d3d] text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-yellow-300 drop-shadow-lg text-center leading-tight">
        Chef's Companion
      </h1>

      <SearchForm onSearch={handleSearch} />

      {/* Initial Guidance / No Search State */}
      {!hasSearched && !loading && !error && recipes.length === 0 && (
        <div className="mt-12 p-6 bg-gray-700 rounded-lg shadow-xl text-center text-lg max-w-md">
          <p className="mb-4 text-gray-200">
            Welcome! Start by searching for your favorite ingredients or dish names above.
          </p>
          <p className="text-yellow-300 font-semibold">
            E.g., "chicken pasta", "vegan curry", "quick salad"
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex flex-col items-center mt-8 text-yellow-300 text-xl">
          <i className="fas fa-spinner fa-spin text-4xl mb-3"></i>
          <p>Whipping up some recipes...</p>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="mt-8 p-4 bg-red-800 rounded-lg text-white text-center shadow-lg max-w-lg">
          <p className="font-bold text-lg mb-2"><i className="fas fa-exclamation-triangle mr-2"></i>Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Recipe List Component */}
      {!loading && !error && recipes.length > 0 && (
        <RecipeList recipes={recipes} onViewDetails={handleViewDetails} />
      )}

      {/* Recipe Details Component (conditionally rendered) */}
      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default App;
