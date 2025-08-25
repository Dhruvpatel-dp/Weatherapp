import React, { useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';

const LoadingSpinner = ({ message = "Loading weather data..." }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.loadingContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <ActivityIndicator size="large" color="white" />
      <Animated.Text style={styles.loadingText}>{message}</Animated.Text>
    </Animated.View>
  );
};

export default LoadingSpinner;