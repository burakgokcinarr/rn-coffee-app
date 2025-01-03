import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants';
import { Image } from 'expo-image';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CustomTextInput, CustomButton } from '../../components';
import { Smartphone, ArrowRight } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { supabase } from '../../lib/supabase';

const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const SignUp: React.FC = () => {

    const [phone, setPhone] = React.useState('');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleSignUp = async () => {
        try {
            const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
            const { error } = await supabase.auth.signInWithOtp({
                phone: formattedPhone,
            });

            if (error) throw error;

            navigation.navigate('OTPVerification', { phone: formattedPhone });
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

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

                <Text style={styles.signInText}>Sign Up</Text>
                <Text style={styles.subText}>Let's create you an account.</Text>

                <View style={styles.inputContainer}>
                    <CustomTextInput
                        value={phone}
                        placeholder="Phone Number"
                        onChangeText={setPhone}
                        iconLeft={<Smartphone size={20} color={Colors.white} />}
                        keyboardType="phone-pad"
                    />
                </View>

                <CustomButton
                    title='Sign Up'
                    onPress={handleSignUp}
                    buttonStyle={{ alignSelf: 'center' }}
                    icon={<ArrowRight color={Colors.white} size={25} style={{ position: 'absolute', right: 10 }} />}
                />

                <View style={styles.containerSignIn}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.signUpText}>
                        Do you have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
                        <Text style={styles.text}>Sign In</Text>
                    </TouchableOpacity>
                </View>

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
        textAlign: 'center'
    },
    text: {
        color: Colors.primary,
        textDecorationLine: 'underline',
        marginLeft: 4
    },
    containerSignIn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    }
});

export default SignUp;