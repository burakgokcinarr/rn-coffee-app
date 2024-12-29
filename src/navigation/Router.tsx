import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../constants';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Onboarding, SignIn, SignUp, ForgotPassword } from '../screens/auth';
import { PhoneAuthScreen } from '../screens/PhoneAuthScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import TabView from '../screens/main/TabView';

type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    App: undefined;
    ForgotPassword: undefined;
    PhoneAuth: undefined;
    OTPVerification: { phone: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackOption: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false
};

const stackOptionWithHeader: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackButtonDisplayMode: 'minimal',
    title: "",
    headerTintColor: Colors.white,
    headerTransparent: true
};

const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOption}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={stackOptionWithHeader} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={stackOptionWithHeader} />
                <Stack.Screen name="App" component={TabView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;