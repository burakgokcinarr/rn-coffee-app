import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants';
import { Image } from 'expo-image';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CustomTextInput, CustomButton } from '../../components';
import { RectangleEllipsis, ArrowRight } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const ForgotPassword: React.FC = () => {

    const [password, setPassword]     = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
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

                <Text style={styles.forgotText}>Forgot Password</Text>
                <Text style={styles.subText}>We’ve already met!</Text>

                <View style={styles.inputContainer}>
                    <CustomTextInput
                        value={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                        iconLeft={<RectangleEllipsis size={20} color={Colors.white} />}
                    />
                    <CustomTextInput
                        value={rePassword}
                        placeholder="Re-Password"
                        onChangeText={setRePassword}
                        iconLeft={<RectangleEllipsis size={20} color={Colors.white} />}
                    />
                </View>

                <CustomButton
                    title='Confirm'
                    onPress={() => navigation.navigate('App')}
                    buttonStyle={{ alignSelf: 'center', bottom: 10 }}
                    icon={<ArrowRight color={Colors.white} size={25} style={{ position: 'absolute', right: 10 }} />}
                />

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
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
    forgotText: {
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
    }
});

export default ForgotPassword;