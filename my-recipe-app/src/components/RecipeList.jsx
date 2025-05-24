import React from 'react';

/**
 * RecipeList Component
 * Displays a list of recipes.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.recipes - An array of recipe objects to display.
 * @param {function} props.onViewDetails - Callback function to be called when "View Recipe" is clicked.
 */
function RecipeList({ recipes, onViewDetails }) {
  // If no recipes are found, display a message
  if (!recipes || recipes.length === 0) {
    return <div className="text-center text-lg text-gray-300 mt-8">No recipes found. Try a different search!</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 p-4">
      {recipes.map(recipe => (
        <div
          key={recipe.id} // Unique key for each recipe item
          className="recipe-item flex flex-col items-center justify-center p-4 w-52 bg-stone-100 text-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="max-w-full h-auto rounded-md mb-3"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x150/cccccc/333333?text=No+Image`; }} // Fallback image
          />
          <h3 className="text-lg font-semibold mb-2 text-center">{recipe.title}</h3>
          <button
            onClick={() => onViewDetails(recipe.id)} // Call onViewDetails with recipe ID
            className="px-4 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors duration-200"
          >
            View Recipe
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
