import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Fonts } from '../../constants';
import { CustomButton } from '../../components';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const Onboarding: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                style={styles.image}
                source={BACKGROUND_IMAGE}
                contentFit="cover"
                transition={750}
            />
            <Image
                style={styles.coffee}
                source={COFFEE_IMAGE}
                contentFit="cover"
                transition={250}
            />
            <Text style={styles.title}>Coffee Taste !</Text>
            <View style={styles.descView}>
                <Text style={styles.descTitle}>Find your favorite</Text>
                <Text style={styles.desc}>Coffee Taste!</Text>
                <Text style={styles.descText}>We’re coffee shop, beer and wine bar, & event space for performing arts</Text>
            </View>

            <CustomButton
                title="Get Started"
                onPress={() => navigation.navigate("SignIn")}
                buttonStyle={{ marginTop: 50 }}
                icon={<ArrowRight color={Colors.white} size={25} style={{ position: 'absolute', right: 10 }} />}>
            </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 50
    },
    image: {
        ...StyleSheet.absoluteFillObject
    },
    coffee: {
        width: 60,
        height: 60
    },
    title: {
        fontSize: 35,
        color: Colors.white,
        fontFamily: Fonts.regular,
        marginTop: -20,
        textTransform: 'uppercase'
    },
    descView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    descTitle: {
        fontSize: 40,
        color: Colors.white
    },
    desc: {
        fontSize: 45,
        color: Colors.white,
        fontWeight: 'bold'
    },
    descText: {
        fontSize: 20,
        color: Colors.white,
        textAlign: 'center',
        opacity: 0.7,
    }
});

export default Onboarding;