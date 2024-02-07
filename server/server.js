import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import axios from "axios";
// import Database from "better-sqlite3";

const PORT = "1998";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Root route!");
});

app.get("/location", async (req, res) => {
  //handle request
  const { locationInput } = req.query;
  console.log(locationInput);
  //retrieve URLs
  const API_Location = `https://eu1.locationiq.com/v1/search?q=${locationInput}&key=${process.env.LOCATION_KEY}&format=json`;
  // console.log(API_Location);
  let locationData = await axios.get(API_Location);

  const wrangledLocationData = {
    latitude: locationData.data[0].lat,
    longitude: locationData.data[0].lon,
  };

  res.json(wrangledLocationData);
});

//use location data for everything else
// const SUNTIMES_URL =
//   "https://api.sunrise-sunset.org/json?lat=53.408371&lng=-2.991573&date=today";

//   const res = await fetch(SUNTIMES_URL);
//   const sunData = await res.json();

//   return NextResponse.json(sunData.results);
// }

// listen

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
