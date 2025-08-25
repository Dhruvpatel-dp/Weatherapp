import axios from 'axios';

const API_KEY = '9af2d5f9fe898e01f0ef085cc874a3d6'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherAPI = {
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Unable to fetch weather data. Please try again later.');
      }
    }
  },

  getWeatherIcon: (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  },
};