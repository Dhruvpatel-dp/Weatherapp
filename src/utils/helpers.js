export const getBackgroundGradient = (weatherMain) => {
  const gradients = {
    'Clear': ['#87CEEB', '#FFD700', '#FFA500'], // Sky blue to gold to orange
    'Clouds': ['#708090', '#B0C4DE', '#D3D3D3'], // Gray to light steel blue
    'Rain': ['#4B0082', '#483D8B', '#6495ED'], // Indigo to slate blue
    'Drizzle': ['#4B0082', '#483D8B', '#6495ED'], // Same as rain
    'Thunderstorm': ['#2F4F4F', '#483D8B', '#4B0082'], // Dark slate gray to indigo
    'Snow': ['#F0F8FF', '#E6E6FA', '#D3D3D3'], // Alice blue to lavender
    'Mist': ['#C0C0C0', '#D3D3D3', '#E6E6FA'], // Silver to light gray
    'Smoke': ['#C0C0C0', '#D3D3D3', '#E6E6FA'],
    'Haze': ['#C0C0C0', '#D3D3D3', '#E6E6FA'],
    'Fog': ['#C0C0C0', '#D3D3D3', '#E6E6FA'],
  };
  
  return gradients[weatherMain] || gradients['Clear'];
};

export const getWeatherEmoji = (weatherMain) => {
  const emojis = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Fog': '🌫️',
  };
  
  return emojis[weatherMain] || '🌤️';
};

export const formatTemperature = (temp, unit = 'C') => {
  return `${Math.round(temp)}°${unit}`;
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};