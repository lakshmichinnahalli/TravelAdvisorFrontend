import React, { useState } from 'react';

// Main App component for the Travel Advisor frontend
const App = () => {
  // State to store the user's search query
  const [query, setQuery] = useState('');
  // State to store the travel advice results
  const [adviceResults, setAdviceResults] = useState([]);
  // State to manage loading status during API calls (even dummy ones)
  const [isLoading, setIsLoading] = useState(false);

  // Dummy data for demonstration purposes
  const dummyTravelAdvice = [
    { id: 1, destination: 'Paris, France', advice: 'Visit the Eiffel Tower, Louvre Museum, and enjoy a Seine River cruise. Try local pastries!' },
    { id: 2, destination: 'Kyoto, Japan', advice: 'Explore ancient temples like Kinkaku-ji, walk through Arashiyama Bamboo Grove, and experience a traditional tea ceremony.' },
    { id: 3, destination: 'Rio de Janeiro, Brazil', advice: 'Relax on Copacabana Beach, hike Sugarloaf Mountain, and see the Christ the Redeemer statue.' },
    { id: 4, destination: 'Cairo, Egypt', advice: 'Discover the Pyramids of Giza, explore the Egyptian Museum, and take a felucca ride on the Nile.' },
    { id: 5, destination: 'Sydney, Australia', advice: 'See the Sydney Opera House, climb the Sydney Harbour Bridge, and visit Bondi Beach.' },
  ];

  // Function to simulate fetching travel advice based on the query
  const fetchAdvice = () => {
    setIsLoading(true); // Start loading

    // Simulate an asynchronous operation (like an API call)
    setTimeout(() => {
      const filtered = dummyTravelAdvice.filter(item =>
        item.destination.toLowerCase().includes(query.toLowerCase()) ||
        item.advice.toLowerCase().includes(query.toLowerCase())
      );
      setAdviceResults(filtered); // Update the results state
      setIsLoading(false); // End loading
    }, 1000); // Simulate a 1-second delay
  };

  // Handle form submission (when user clicks search or presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form refresh behavior
    if (query.trim()) { // Only search if the query is not empty
      fetchAdvice();
    } else {
      setAdviceResults([]); // Clear results if query is empty
    }
  };

  return (
    // Main container with Tailwind CSS for centering and background
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4 font-sans">
      {/* Card-like container for the application content */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border border-gray-200">
        {/* Application Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
          Hi! I'm your Travel Advisor 👋
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Planning your next trip? Get personalized travel advice based on your interests and preferences.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="e.g., Paris, Japan, or beach trips"
            value={query} // Input value is controlled by the 'query' state
            onChange={(e) => setQuery(e.target.value)} // Update 'query' state on change
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            aria-label="Search for travel advice"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out text-lg font-semibold"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Searching...' : 'Get Advice'}
          </button>
        </form>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center text-blue-600 text-xl font-medium mb-6">
            Searching for advice...
          </div>
        )}

        {/* Display Travel Advice Results */}
        <div className="space-y-6">
          {adviceResults.length > 0 ? (
            // Map over the adviceResults array to display each item
            adviceResults.map((item) => (
              <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200 ease-in-out">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">📍 {item.destination}</h3>
                <p className="text-gray-600 leading-relaxed">{item.advice}</p>
              </div>
            ))
          ) : (
            // Message when no results are found or before any search
            !isLoading && (
              <div className="text-center text-gray-500 text-lg py-8">
                Enter your travel query above to find advice!
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
