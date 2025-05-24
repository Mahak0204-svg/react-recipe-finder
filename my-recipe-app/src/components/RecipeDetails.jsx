import React from 'react';

/**
 * RecipeDetails Component
 * Displays the detailed information of a selected recipe in a modal-like overlay.
 * @param {Object} props - Component props.
 * @param {Object} props.recipe - The recipe object containing details (title, image, ingredients, instructions).
 * @param {function} props.onClose - Callback function to close the details view.
 */
function RecipeDetails({ recipe, onClose }) {
  // If no recipe is provided, don't render anything
  if (!recipe) {
    return null;
  }

  return (
    // Overlay container for the recipe details
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        id="recipe-details-modal"
        className="bg-gray-700 text-white rounded-lg shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }} // Limit height for scrollability
      >
        {/* Status bar with close button */}
        <div id="statusBar" className="flex justify-end items-center bg-gray-600 p-3 rounded-t-lg">
          <button
            onClick={onClose} // Call onClose prop when button is clicked
            className="text-white text-2xl hover:text-red-400 transition-colors duration-200 focus:outline-none"
            aria-label="Close recipe details"
          >
            <i className="fas fa-times-circle"></i> {/* Font Awesome close icon */}
          </button>
        </div>

        {/* Recipe content area with scrollbar */}
        <div id="recipe-content" className="p-5 overflow-y-auto flex-grow">
          <h2 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="max-w-full h-auto rounded-lg mx-auto mb-6 shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/cccccc/333333?text=No+Image`; }} // Fallback image
          />
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-6">
              {/* Map through extendedIngredients to display each one */}
              {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
            {/* Using dangerouslySetInnerHTML because instructions often contain HTML tags */}
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="prose prose-invert max-w-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
