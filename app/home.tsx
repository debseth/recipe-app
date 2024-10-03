import { FlatList, StyleSheet, Text, TextInput, View, Image, ScrollView, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import className from 'twrnc';
import PersonIcon from '../assets/PersonIcon';
import BellIcon from '../assets/BellIcon';
import SearchIcon from '../assets/SearchIcon';
import categories from '../assets/data/categories.json';

const Home = () => {
  // Animated values for opacity and scale
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start with opacity 0
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Start with scale 0.5

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Function to start animations
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Target opacity
        duration: 900, // Duration in ms
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Target scale
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Start animation when component mounts
  useEffect(() => {
    startAnimation();
  }, []);

  // Function to filter recipes based on the search term
  const filteredCategories = categories.categories.filter(category =>
    category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ flexGrow: 1 }} // Allows for scrolling even if content is less than screen height
    >
      <View style={className`p-0`}>

        {/* Header with animation */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={className`flex-row items-center justify-between`}>
            <PersonIcon />
            <BellIcon />
          </View>
        </Animated.View>

        {/* Texts with animation */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={className`pt-0 p-2`}>
            <Text style={className`font-semibold text-lg`}>Hello, Seth!</Text>
            <Text style={className`font-bold text-3xl`}>
              Make your own food, stay at 
              <Text style={className`text-orange-500`}> home</Text>
            </Text>
          </View>
        </Animated.View>

        {/* Search input with animation */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={className`bg-gray-200 p-0 px-0 rounded-full mx-5 flex-row justify-start items-center gap-2`}>
            <TextInput 
              placeholder='Search any recipe' 
              style={className`flex-1 text-lg font-semibold text-gray-500 p-3 rounded-full`}
              value={searchTerm} // Bind the search term to the input
              onChangeText={setSearchTerm} // Update the state on text change
            />
            <SearchIcon />
          </View>
        </Animated.View>

        {/* Categories with animation */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={className`gap-5 p-5`} 
            data={filteredCategories}  // Use filtered categories for display
            keyExtractor={(item) => item.idCategory.toString()} 
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.strCategoryThumb }} style={className`h-12 w-15`} />
                <Text style={className`font-semibold text-gray-500 mt-1`}>{item.strCategory}</Text>
              </View>
            )}
          />
        </Animated.View>

        {/* Recipes with animation */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={className`px-5 text-3xl font-semibold`}>Recipes</Text>
          {/* Vertical layout for recipes */}
          <View style={className`flex-col`}>
            {filteredCategories.map((category, index) => (
              <View key={index} style={className`flex-row justify-between items-center p-5`}>
                <View style={className`flex-1 items-center`}>
                  <Image source={{ uri: category.strCategoryThumb }} style={className`h-28 w-42`} />
                  <Text style={className`font-semibold text-gray-500 mt-1 text-center`}>{category.strCategory}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({});
