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
  const { locationInput } = req.query;

  const API_Location = `https://eu1.locationiq.com/v1/search?q=${locationInput}&key=${process.env.LOCATION_KEY}&format=json`;

  let locationData = await axios.get(API_Location);

  const wrangledLocationData = {
    latitude: locationData.data[0].lat,
    longitude: locationData.data[0].lon,
  };

  const API_Map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATION_KEY}&center=${wrangledLocationData.latitude},${wrangledLocationData.longitude}&zoom=14&size=200px200px&maptype=light`;

  const API_SuntimesToday = `https://api.sunrise-sunset.org/json?lat=${wrangledLocationData.latitude}&lng=${wrangledLocationData.longitude}&date=today`;

  let sunTimeData = await axios.get(API_SuntimesToday);

  // console.log(sunTimeData.data.results);

  res.status(200).json({
    wrangledLocationData,
    API_Map,
    suntimesToday: sunTimeData.data.results,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
