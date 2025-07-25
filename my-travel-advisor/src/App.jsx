import React, { useState, useEffect } from 'react';

const months = [
  { name: 'January', value: '01' },
  { name: 'February', value: '02' },
  { name: 'March', value: '03' },
  { name: 'April', value: '04' },
  { name: 'May', value: '05' },
  { name: 'June', value: '06' },
  { name: 'July', value: '07' },
  { name: 'August', value: '08' },
  { name: 'September', value: '09' },
  { name: 'October', value: '10' },
  { name: 'November', value: '11' },
  { name: 'December', value: '12' },
];

const travelTypes = [
    { name: 'Solo Travel', value: 'solo' },
    { name: 'Group Travel', value: 'group' },
    { name: 'Family Holidays', value: 'family' },
    { name: 'Luxury Holidays', value: 'luxury' },
    { name: 'Budget Travel', value: 'budget' },
    { name: 'Romantic Getaways', value: 'romantic' },
  ];


// Main App component for the Travel Advisor frontend
const App = () => {
  // --- State Variables for Form Inputs ---
  const [selectedTripType, setSelectedTripType] = useState(null); // 'domestic', 'international', or null
  const [numberOfDays, setNumberOfDays] = useState(''); // e.g., '3-5', '6-10'
  const [selectedCountryCode, setSelectedCountryCode] = useState(''); // Stores the alpha-2 code (e.g., 'US', 'FR')
  const [selectedPassportCountryCode, setSelectedPassportCountryCode] = useState(''); // Stores the passport country code
  // --- State Variables for API Data and UI Feedback ---
  const [countries, setCountries] = useState([]); // Stores the list of country objects from API
  const [isLoadingCountries, setIsLoadingCountries] = useState(true); // Loading state for country API call
  const [countryError, setCountryError] = useState(null); // Error state for country API call
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [submissionMessage, setSubmissionMessage] = useState(null); // Message after form submission
  const [selectedMonth, setSelectedMonth] = useState(''); // Stores the selected month for the trip
  const [selectedTravelType, setSelectedTravelType] = useState(''); // Stores the selected travel type
  // --- useEffect Hook to Fetch Country Data on Component Mount ---
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Updated API URL: Added '?fields=name,flags,cca2' to specify required fields
        // The Restcountries API now returns a 400 Bad Request if no fields are specified for the /all endpoint.
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
        if (!response.ok) {
          // If response is not OK (e.g., 400, 404, 500), throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Sort countries alphabetically by common name for better user experience
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedData); // Update the state with fetched and sorted countries
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountryError("Failed to load countries. Please try again later."); // Set error message
      } finally {
        setIsLoadingCountries(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCountries(); // Call the async function to fetch countries
  }, []); // Empty dependency array means this effect runs only once after the initial render (on mount)

  // --- Helper to get the full country object for the selected country code ---
  const getSelectedCountryData = () => {
    return countries.find(country => country.cca2 === selectedCountryCode);
  };

  const getSelectedPassportCountryData = () => {
    return countries.find(country => country.cca2 === selectedPassportCountryCode);
  };

  // --- Function to Simulate Sending Data to Backend ---
  const sendToBackendForPromptEngineering = (formData) => {
    setIsSubmitting(true);
    setSubmissionMessage(null); // Clear any previous messages

    setTimeout(() => {
      console.log("Data collected for backend prompt engineering:", formData);
      // --- Placeholder for actual API call ---
      // This is where you would integrate your 'fetch' or Axios call to your backend.
      /*
      fetch('/api/generate-travel-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Potentially add authorization headers here
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Backend response:', data);
        setSubmissionMessage('Your preferences have been sent successfully! Check console for simulated backend response.');
        // Here, you would typically update your UI with the actual travel advice received from the backend.
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
        setSubmissionMessage('Failed to send preferences. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
      */

      // --- Simulated success message for demonstration ---
      setSubmissionMessage('Your preferences have been sent to the backend!');
      setIsSubmitting(false);
    }); // Simulate 1.5 second delay for backend processing
  };

  // --- Handle Overall Form Submission ---
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)

    // Collect all the form data into a single object
    const formData = {
      tripType: selectedTripType,
      duration: numberOfDays,
      //countryCode: selectedCountryCode, // Include the selected country code
      countryName: getSelectedCountryData()?.name.common, // Optionally include the full country name
      //passportCountryCode: selectedPassportCountryCode, // Include the passport country code
      passportCountryName: getSelectedPassportCountryData()?.name.common, // Optionally include the full passport country name
      selectedMonth: selectedMonth, // Include the selected month for the trip
      selectedTravelType: selectedTravelType, // Include the selected travel type
    };

    // Basic validation: ensure at least one of the fields is selected/filled
    if (!formData.tripType || !formData.duration || !formData.countryName || !formData.passportCountryName || !formData.selectedMonth || !formData.selectedTravelType) {
      alert("Please select all field options before submitting.");
      return;
    }

    sendToBackendForPromptEngineering(formData); // Call function to "send" data
  };

  // --- Render the Component ---
  return (
    // Main container with responsive styling using Tailwind CSS
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4 font-sans">
      {/* Card-like container for the application */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border border-gray-200">
        {/* Application Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
          Hi, I'm your Travel Advisor! 
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Let's plan your next trip together. Please fill out the form below to get personalized travel advice.
        </p>

        {/* The main form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* Domestic / International Buttons */}
          <div className="justify-center mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Trip Type:
            </label>
            <div className="flex gap-4 justify-center mb-4">
              <button
                type="button" // Important: use type="button" to prevent form submission
                onClick={() => setSelectedTripType('domestic')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out text-lg ${
                  selectedTripType === 'domestic'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Domestic
              </button>
              <button
                type="button" // Important: use type="button" to prevent form submission
                onClick={() => setSelectedTripType('international')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out text-lg ${
                  selectedTripType === 'international'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                International
              </button>
            </div>
          </div>

                 {/* Travel Type Selection */}
          <div>
            <label className='block text-gray-700 text-lg font-medium mb-2'>
              What type of travel are you interested in?
            </label>
              <div className='flex flex-wrap gap-4 justify-center'> {
                travelTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button" // Important: use type="button" to prevent form submission
                    onClick={() => setSelectedTravelType(type.value)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out text-lg ${
                      selectedTravelType === type.value
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type.name}
                  </button>
                ))
              }
              </div>   
          </div>

          {/* Number of Days Dropdown */}
          <div>
            <label htmlFor="numDays" className="block text-gray-700 text-lg font-medium mb-2">
              How many days?
            </label>
            <select
              id="numDays"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              aria-label="Select number of days for your trip"
            >
              <option value="">Select duration</option>
              <option value="3-5">3-5 Days</option>
              <option value="6-10">6-10 Days</option>
              <option value="11-14">11-14 Days</option>
              <option value="15+">15+ Days</option>
            </select>
          </div>

          {/* Country Dropdown with Flag Display */}
          <div>
            <label htmlFor="countrySelect" className="block text-gray-700 text-lg font-medium mb-2">
              Which country are you residing in?
            </label>
            {isLoadingCountries ? (
              <p className="text-blue-600 text-lg">Loading countries...</p>
            ) : countryError ? (
              <p className="text-red-500 text-lg">Error: {countryError}</p>
            ) : (
              <select
                id="countrySelect"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
                aria-label="Select a country"
              >
                <option value="">-- Select a country --</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.cca2}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            )}

            {/* Display selected country's flag and name below the dropdown */}
            {selectedCountryCode && getSelectedCountryData() && (
              <div className="flex items-center mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <img
                  src={getSelectedCountryData().flags.png}
                  alt={`${getSelectedCountryData().name.common} flag`}
                  className="w-10 h-auto mr-3 rounded-sm shadow"
                />
                <p className="text-blue-800 text-lg font-semibold">
                  {getSelectedCountryData().name.common}
                </p>
              </div>
            )}
          </div>

          {/* Country Passport Selection */}
          <div>
            <label htmlFor="passportSelect" className="block text-gray-700 text-lg font-medium mb-2">
              Which country passport do you have?
            </label>
            {isLoadingCountries ? (
              <p className="text-blue-600 text-lg">Loading countries...</p>
            ) : countryError ? (
              <p className="text-red-500 text-lg">Error: {countryError}</p>
            ) : (
              <select
                id="passportSelect"
                value={selectedPassportCountryCode}
                onChange={(e) => setSelectedPassportCountryCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
                aria-label="Select a country"
              >
                <option value="">-- Select a country --</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.cca2}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            )}

            {/* Display selected country's flag and name below the dropdown */}
            {selectedPassportCountryCode && getSelectedPassportCountryData() && (
              <div className="flex items-center mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <img
                  src={getSelectedPassportCountryData().flags.png}
                  alt={`${getSelectedPassportCountryData().name.common} flag`}
                  className="w-10 h-auto mr-3 rounded-sm shadow"
                />
                <p className="text-blue-800 text-lg font-semibold">
                  {getSelectedPassportCountryData().name.common}
                </p>
              </div>
            )}
          </div>

          {/* Month Selection Dropdown */}
          <div>
            <label htmlFor="monthSelect" className="block text-gray-700 text-lg font-medium mb-2">
              When do you plan to travel?
            </label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
              aria-label="Select a month for your trip"
            >
              <option value="">-- Select a month --</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>

   

          {/* Submit Button for the form */}
          <button
            type="submit"
            className="w-64 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 
            focus:ring-opacity-75 transition duration-300 ease-in-out text-lg font-semibold mt-6
            mx-auto block"
            disabled={isSubmitting || isLoadingCountries} // Disable if submitting or countries are still loading
          >
           Get Personalized Advice
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
