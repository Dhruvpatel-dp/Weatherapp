import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { formatTemperature, capitalizeWords, getWeatherEmoji } from '../utils/helpers';
import { weatherAPI } from '../services/weatherAPI';

const WeatherCard = ({ weatherData, onRefresh }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconBounce = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    iconBounce.setValue(0);
    cardScale.setValue(0.8);

    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Icon bounce animation with delay
    setTimeout(() => {
      Animated.spring(iconBounce, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 400);
  }, [weatherData]);

  const animateRefresh = () => {
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRefresh = () => {
    animateRefresh();
    onRefresh();
  };

  const iconUri = weatherAPI.getWeatherIcon(weatherData.weather[0].icon);

  return (
    <Animated.View
      style={[
        styles.weatherContainer,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: cardScale },
          ],
        },
      ]}
    >
      <View style={styles.weatherCard}>
        <Text style={styles.cityName}>
          {weatherData.name}, {weatherData.sys.country}
        </Text>

        <Animated.View
          style={{
            transform: [
              {
                scale: iconBounce.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={{ uri: iconUri }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.temperature}>
          {formatTemperature(weatherData.main.temp)}
        </Text>

        <Text style={styles.description}>
          {capitalizeWords(weatherData.weather[0].description)} {getWeatherEmoji(weatherData.weather[0].main)}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Feels Like</Text>
            <Text style={styles.detailValue}>
              {formatTemperature(weatherData.main.feels_like)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>
              {weatherData.main.humidity}%
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>
              {weatherData.wind.speed} m/s
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={handleRefresh}
        activeOpacity={0.7}
      >
        <Text style={styles.searchButtonText}>🔄</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WeatherCard;