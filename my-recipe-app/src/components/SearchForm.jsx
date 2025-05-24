import React, { useState } from 'react';

/**
 * SearchForm Component
 * Renders an input field and a search button for recipe queries.
 * @param {Object} props - Component props.
 * @param {function} props.onSearch - Callback function to be called when the search button is clicked.
 */
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState(''); // State to hold the current search input value

  /**
   * Handles the click event on the search button.
   * Calls the onSearch prop with the current query.
   */
  const handleSearchClick = () => {
    onSearch(query);
  };

  /**
   * Handles key presses in the input field.
   * Triggers search if the 'Enter' key is pressed.
   * @param {Object} e - The keyboard event.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center mb-8 bg-white rounded-full shadow-lg p-1">
      <input
        type="text"
        id="query"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        onKeyPress={handleKeyPress} // Listen for Enter key
        className="w-full md:w-80 lg:w-96 p-3 rounded-full border-none outline-none text-base text-gray-800"
      />
      <button
        id="search-button"
        onClick={handleSearchClick} // Call search handler on button click
        className="ml-2 px-6 py-2 h-12 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 text-[#341919] text-base font-bold cursor-pointer shadow-md hover:from-yellow-400 hover:to-yellow-700 transition-all duration-200"
      >
        Search
      </button>
    </div>
  );
}

export default SearchForm;
