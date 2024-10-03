import { StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import className from 'twrnc';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  
  // Set up animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity starts at 0
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Scale starts at 0.5

  // Function to trigger the animations
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Target opacity
        duration: 900, // Animation duration in ms
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Target scale
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Start animation on component mount
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Pressable 
      onPress={() => router.push('home')} 
      style={className`bg-orange-500 flex-1 justify-center items-center`}
    >
     <Animated.View 
  style={{
    opacity: fadeAnim, 
    transform: [{ scale: scaleAnim }],
    flex: 1,               // Allow the view to expand to fill available space
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',      // Center items horizontally
  }}
>
  <Image 
    source={require('../assets/logo.webp')} 
    style={className`w-70 h-70`}
  />
  <Text style={className`text-5xl font-bold text-white`}>Foody</Text>
  <Text style={className`text-lg text-white font-semibold mt-2`}>
    Food is always right!
  </Text>
</Animated.View>

    </Pressable>
  );
}

export default Index;

const styles = StyleSheet.create({});
