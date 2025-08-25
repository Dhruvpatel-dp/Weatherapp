import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated, Alert } from 'react-native';
import { styles } from '../styles/styles';

const SearchInput = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const buttonScale = useRef(new Animated.Value(1)).current;
  const inputSlide = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(inputSlide, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = () => {
    if (city.trim().length < 2) {
      Alert.alert('Invalid Input', 'Please enter a valid city name (at least 2 characters).');
      return;
    }
    
    onSearch(city.trim());
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleButtonPress = () => {
    animateButton();
    handleSearch();
  };

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        {
          transform: [
            {
              translateY: inputSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
          opacity: inputSlide,
        },
      ]}
    >
      <TextInput
        style={styles.searchInput}
        placeholder="Enter city name..."
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="words"
        autoCorrect={false}
        editable={!isLoading}
      />
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleButtonPress}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.searchButtonText}>
            {isLoading ? 'Searching...' : 'Get Weather'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default SearchInput;