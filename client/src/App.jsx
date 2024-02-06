import React, { useState } from "react";
import "./App.css";

function App() {
  const [locationInput, setLocationInput] = useState("");

  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Location input:", locationInput);
  };

  return (
    <main>
      <h1>NatureConnect</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="locationInput">What's your location?</label>
        <input
          type="text"
          value={locationInput}
          onChange={handleLocationInputChange}
        />
        <button type="submit">Go!</button>
      </form>
    </main>
  );
}

export default App;
