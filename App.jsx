import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './src/styles/styles';
import { getBackgroundGradient } from './src/utils/helpers';
import { weatherAPI } from './src/services/weatherAPI';
import SearchInput from './src/components/SearchInput';
import WeatherCard from './src/components/WeatherCard';
import LoadingSpinner from './src/components/LoadingSpinner';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundColors, setBackgroundColors] = useState(['#87CEEB', '#FFD700', '#FFA500']);
  
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await weatherAPI.getCurrentWeather(city);
      const newColors = getBackgroundGradient(data.weather[0].main);
      
      // Animate background color change
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setBackgroundColors(newColors);
        backgroundAnim.setValue(0);
      });
      
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (weatherData) {
      fetchWeather(weatherData.name);
    }
  };

  const handleRetry = () => {
    setError(null);
    setWeatherData(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (weatherData) {
      return <WeatherCard weatherData={weatherData} onRefresh={handleRefresh} />;
    }

    return (
      <View style={styles.initialState}>
        <Text style={styles.welcomeEmoji}>🌤️</Text>
        <Text style={styles.welcomeText}>
          Welcome to Weather App{'\n'}Enter a city name to get started
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={backgroundColors} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.title}>Weather App</Text>
          </View>
          
          <SearchInput onSearch={fetchWeather} isLoading={isLoading} />
          
          {renderContent()}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default App;