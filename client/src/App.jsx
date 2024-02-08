import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const localServer = `http://localhost:1998`;

function App() {
  const [locationInput, setLocationInput] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapImage, setMapImage] = useState("");
  const [sunriseToday, setSunriseToday] = useState("");
  const [sunsetToday, setSunsetToday] = useState("");

  //handle location
  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  // handle Location and Sun APIs
  async function handleAPIData(event) {
    event.preventDefault();
    console.log("Location input:", locationInput);

    const API = `${localServer}/location?locationInput=${locationInput}`;
    const res = await axios.get(API);

    setLatitude(res.data.wrangledLocationData.latitude);
    setLongitude(res.data.wrangledLocationData.longitude);
    setMapImage(res.data.API_Map);
    setSunriseToday(res.data.suntimesToday.sunrise);
    setSunsetToday(res.data.suntimesToday.sunset);

    // console.log(latitude, longitude);
  }

  return (
    <main>
      <h1>NatureConnect</h1>
      <form onSubmit={handleAPIData}>
        <label htmlFor="locationInputID">What's your location?</label>
        <input
          type="text"
          value={locationInput}
          id="locationInputID"
          onChange={handleLocationInputChange}
        />
        <button type="submit">Go!</button>
      </form>
      {latitude ? (
        <div className="map img-wrap">
          <img className="map" src={mapImage} />
        </div>
      ) : null}
      {latitude ? (
        <div>
          <p>Sunrise : {sunriseToday}</p>
          <p>Sunset : {sunsetToday}</p>
        </div>
      ) : null}
    </main>
  );
}

export default App;
