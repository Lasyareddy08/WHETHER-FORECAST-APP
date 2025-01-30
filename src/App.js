import React, { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London"); // Default city is London
  const [inputCity, setInputCity] = useState(""); // State for user input

  // Fetch weather data when city changes
  useEffect(() => {
    const API_KEY = "21e5764bd5320c079a6e9c9b828dfa88"; // Place the API key in quotes
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.weather && data.weather.length > 0) {
            setWeatherData(data.weather); // Set weather data if available
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [city]); // Dependency array includes city

  // Function to handle form submission
  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(inputCity); // Update the city to the input value
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather Forecast</h1>

      {/* City input */}
      <form onSubmit={handleCityChange} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)} // Update the input city
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {/* Display weather data */}
      {weatherData ? (
        <div style={styles.weatherInfo}>
          <h2 style={styles.cityName}><strong>Weather in {city}</strong></h2>
          <p style={styles.weatherDescription}><strong>{weatherData[0]?.description}</strong></p> {/* Safe access to weather data */}
        </div>
      ) : (
        <div style={styles.loading}>Loading...</div> // Show loading while data is fetched
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f0f8ff", // Light blue background
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
    margin: "auto",
  },
  heading: {
    color: "#2c3e50", // Dark blue for the title
    fontSize: "36px",
    fontWeight: "bold",
  },
  form: {
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db", // Blue button
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  weatherInfo: {
    marginTop: "20px",
  },
  cityName: {
    color: "#27ae60", // Green for the city name
    fontSize: "24px",
  },
  weatherDescription: {
    color: "#e74c3c", // Red for the weather description
    fontSize: "20px",
  },
  loading: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#95a5a6", // Grey for loading text
  },
};

export default App;