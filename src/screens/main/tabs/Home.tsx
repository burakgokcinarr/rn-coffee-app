import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Fonts } from '../../../constants';
import { Search, Settings2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { categories, products } from '../../../data/Mock';

const { width } = Dimensions.get('window');

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

// Dummy data
const frozenBeverages = [
    {
        id: 1,
        name: 'Coffee',
        price: 22.00,
        image: 'https://atakafe.atakum.bel.tr/img/1179244943.jpg'
    },
    {
        id: 2,
        name: 'Coffee',
        price: 85.00,
        image: 'https://atakafe.atakum.bel.tr/img/1179244943.jpg'
    }
];

// FrozenBeverages component'i için ayrı stiller
const frozenBeveragesStyles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
    },
    seeAll: {
        fontSize: 14,
        color: Colors.warning,
    },
    scrollContainer: {
        paddingHorizontal: 12,
    },
    itemContainer: {
        width: 160,
        marginHorizontal: 4,
        padding: 12,
        backgroundColor: Colors.primary,
        borderRadius: 12,
    },
    imageContainer: {
        width: '100%',
        height: 120,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.white,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.warning,
    },
});

const FrozenBeverages = () => {
    return (
        <View style={frozenBeveragesStyles.container}>
            <View style={frozenBeveragesStyles.header}>
                <Text style={frozenBeveragesStyles.title}>Frozen Beverages</Text>
                <TouchableOpacity>
                    <Text style={frozenBeveragesStyles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={frozenBeveragesStyles.scrollContainer}
            >
                {frozenBeverages.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={frozenBeveragesStyles.itemContainer}
                    >
                        <View style={frozenBeveragesStyles.imageContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={frozenBeveragesStyles.image}
                                contentFit="contain"
                            />
                            <Text style={frozenBeveragesStyles.itemName}>{item.name}</Text>
                            <Text style={frozenBeveragesStyles.itemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const Home: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const renderCategory = useCallback(({ item }: { item: Category }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                item.id === selectedCategory?.id && styles.activeCategoryItem
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
    ), [selectedCategory]);

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
            <StatusBar style="light" />
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
                        style={styles.coffeeImage}
                        contentFit="cover"
                    />
                    <View>
                        <Text style={styles.greeting}>COFFEE TASTE !</Text>
                    </View>
                </View>
            </View>

            {/* Profile Bar */}
            <View style={styles.profileView}>
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?ga=GA1.1.1087755220.1735906204&semt=ais_hybrid' }}
                    style={styles.profileImage}
                    contentFit="cover" />
                <Settings2 color={Colors.white} size={30} />
            </View>

            <Text style={styles.name}>Hi, Burak Gökçınar</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Search color={Colors.white} size={20} />
                <Text style={styles.searchPlaceholder}>Coffee shop, beer & wine...</Text>
            </View>

            {/* Categories */}
            <View>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryList}
                    keyExtractor={item => item.id}
                />
            </View>

            {/* Products */}
            <View>
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.productList}
                    keyExtractor={item => item.id}
                />
            </View>

            <FrozenBeverages />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    coffeeImage: {
        width: 50,
        height: 50
    },
    profileView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
    },
    greeting: {
        color: Colors.white,
        fontSize: 16,
    },
    name: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.29)',
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        gap: 8,
    },
    searchPlaceholder: {
        color: Colors.white,
        opacity: 0.7,
    },
    categoryList: {
        marginTop: 20
    },
    categoryItem: {
        width: 120,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10
    },
    activeCategoryItem: {
        backgroundColor: '#A97C37',
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
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default Home;