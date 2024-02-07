import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const localServer = `http://localhost:1998`;

  const [locationInput, setLocationInput] = useState("");

  //handle location

  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // await handleLocation(event);
    console.log("Location input:", locationInput);
  };

  // async function handleLocation(event) {
  //   event.preventDefault();

  //   const API = `${localServer}/location`;
  //   const res = await axios.get(API);
  // }

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
