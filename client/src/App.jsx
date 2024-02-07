import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const localServer = `http://localhost:1998`;

function App() {
  const [locationInput, setLocationInput] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //handle location

  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //    await handleLocation(event);
  // };

  //get info from location inc lat and lon
  async function handleLocation(event) {
    event.preventDefault();
    console.log("Location input:", locationInput);

    const API = `${localServer}/location?locationInput=${locationInput}`;
    const res = await axios.get(API);

    setLatitude(res.data.latitude);
    setLongitude(res.data.longitude);

    console.log(latitude, longitude);
  }

  return (
    <main>
      <h1>NatureConnect</h1>
      <form onSubmit={handleLocation}>
        <label htmlFor="locationInputID">What's your location?</label>
        <input
          type="text"
          value={locationInput}
          id="locationInputID"
          onChange={handleLocationInputChange}
        />
        <button type="submit">Go!</button>
      </form>
    </main>
  );
}

export default App;
