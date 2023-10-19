import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/';

    axios
      .get(apiUrl)
      .then((response) => {
        if (Array.isArray(response.data.countries)) {
          setCountries(response.data.countries);
        } else {
          console.error('API response does not contain countries:', response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <h2>Country Data:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {countries.length === 0 ? (
            <p>No data available</p>
          ) : (
            countries.map((country, index) => (
              <li key={index}>{country}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
