import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../constants';
import { Image } from 'expo-image';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CustomTextInput, CustomButton } from '../../components';
import { Smartphone, RectangleEllipsis, ArrowRight } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const SignIn: React.FC = () => {

    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" extraScrollHeight={25}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.container}>
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
                <Text style={styles.header}>COFFEE TASTE !</Text>

                <Text style={styles.signInText}>Sign In</Text>
                <Text style={styles.subText}>We’ve already met!</Text>

                <View style={styles.inputContainer}>
                    <CustomTextInput
                        value={phone}
                        placeholder="Phone Number"
                        onChangeText={setPhone}
                        iconLeft={<Smartphone size={20} color={Colors.white} />}
                    />
                    <CustomTextInput
                        value={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                        iconLeft={<RectangleEllipsis size={20} color={Colors.white} />}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <CustomButton
                    title='Sign In'
                    onPress={() => navigation.navigate('Home')}
                    buttonStyle={{ alignSelf: 'center' }}
                    icon={<ArrowRight color={Colors.white} size={25} style={{ position: 'absolute', right: 10 }} />}
                />
                <Text style={styles.signUpText}>Don't have an account? <Text style={{ color: Colors.primary, textDecorationLine: 'underline' }}>Sign Up</Text></Text>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6
    },
    coffee: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        marginTop: 50,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    },
    signInText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 35,
    },
    subText: {
        fontSize: 16,
        color: Colors.white,
        opacity: 0.6,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        gap: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    forgotPassword: {
        color: Colors.primary,
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
    },
    signUpText: {
        color: Colors.white,
        textAlign: 'center',
        marginTop: 8,
    },
});

export default SignIn;