import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Fonts } from '../constants';
import { frozenBeverages } from '../data/Mock';



const FrozenBeverages: React.FC = () => {

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

export default FrozenBeverages;

const frozenBeveragesStyles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
    },
    seeAll: {
        fontSize: 15,
        color: Colors.warning,
        textDecorationLine:'underline'
    },
    itemContainer: {
        width: 120,
        marginHorizontal: 4,
        padding: 4,
        backgroundColor: Colors.background,
        borderRadius: 8,
        borderWidth: 0.4,
        borderColor: Colors.warning
    },
    imageContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        aspectRatio: 1,
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