//instead of using require use import to not get error . like i used below
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';

const app = express();
// here the server port 5000 . use command 'nodemon' to run server in another terminal.
// means when we fetch url from  frontend  , it must be like http://localhost:5000//xyz?name=abc...  , here see 5000 port number
const port = 5000;

app.use(cors());
app.use(express.json());

// below is api route to get information about wather in upcoming 5 days
app.get('/fetchWeather/:city', async (req, res) => {
  const city = req.params.city;
  // here is api key get from  - https://www.weatherapi.com/
  // use your own api key
  const apiKey = 'd8f2c2a5e0984bb6b48181830242805';
  // see url i used - forcast in it. also days=5 .
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    // this will give all data of weather

    res.json(weatherData.forecast.forecastday);
    // this will give only data of 5 days weather
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
