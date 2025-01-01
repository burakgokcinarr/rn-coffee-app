import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../../../constants';
import { Search, Settings2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Category data
const categories = [
  { id: '1', title: 'Coffee', icon: '☕' },
  { id: '2', title: 'Beer', icon: '🍺' },
  { id: '3', title: 'Wine Bar', icon: '🍷' },
  { id: '4', title: 'Event', icon: '🎉' },
];

// Products data
const products = [
  { 
    id: '1', 
    title: 'Chai Latte', 
    price: '85.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/chai-latte.jpg'
  },
  { 
    id: '2', 
    title: 'Matcha Latte', 
    price: '22.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/matcha-latte.jpg'
  },
  { 
    id: '3', 
    title: 'Red Eye Coffee', 
    price: '60.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/red-eye-coffee.jpg'
  },
  { 
    id: '4', 
    title: 'Cappuccino', 
    price: '45.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/cappuccino.jpg'
  },
  { 
    id: '5', 
    title: 'Espresso', 
    price: '35.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/espresso.jpg'
  },
  { 
    id: '6', 
    title: 'Caramel Macchiato', 
    price: '75.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/caramel-macchiato.jpg'
  },
  { 
    id: '7', 
    title: 'Mocha', 
    price: '65.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/mocha.jpg'
  },
  { 
    id: '8', 
    title: 'Americano', 
    price: '40.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/americano.jpg'
  },
  { 
    id: '9', 
    title: 'Turkish Coffee', 
    price: '30.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/turkish-coffee.jpg'
  },
  { 
    id: '10', 
    title: 'Irish Coffee', 
    price: '90.00', 
    image: 'https://mdmmjxmbjgxesudguogx.supabase.co/storage/v1/object/public/coffee-images/irish-coffee.jpg'
  }
];

const BACKGROUND_IMAGE = require('../../../../assets/background.png');
const PROFILE_IMAGE = require('../../../../assets/coffee.png');

interface Category {
  id: string;
  title: string;
  icon: string;
}

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

const Home: React.FC = () => {
  const renderCategory = useCallback(({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        item.id === '1' && styles.activeCategoryItem
      ]}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  ), []);

  const renderProduct = useCallback(({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
      </View>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={BACKGROUND_IMAGE}
        contentFit="cover"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={PROFILE_IMAGE}
            style={styles.profileImage}
            contentFit="cover"
          />
          <View>
            <Text style={styles.greeting}>Hi,</Text>
            <Text style={styles.name}>William</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Settings2 color={Colors.white} size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color={Colors.white} size={20} />
        <Text style={styles.searchPlaceholder}>Coffee shop, beer & wine...</Text>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        keyExtractor={item => item.id}
      />

      {/* Products */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productList}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 8,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    color: Colors.white,
    fontSize: 16,
  },
  name: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  searchPlaceholder: {
    color: Colors.white,
    opacity: 0.7,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    width: 120,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 20,
    marginRight: 10
  },
  activeCategoryItem: {
    backgroundColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 15,
  },
  productList: {
    //marginTop: 20,
  },
  productCard: {
    width: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
  },
  productImageContainer: {
    width: '100%',
    height: width * 0.4,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    color: Colors.primary,
    fontSize: 16,
    marginTop: 4,
  },
});

export default Home;