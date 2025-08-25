// weatherClient.js
import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // replace with your key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getWeatherByCity = async (city) => {
  const url = `${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const res = await axios.get(url);
  return res.data;
};
