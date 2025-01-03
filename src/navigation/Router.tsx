import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../constants';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Onboarding, SignIn, SignUp, ForgotPassword, OTPVerificationScreen } from '../screens/auth';
import TabView from '../screens/main/TabView';
import { supabase } from '../lib/supabase';

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

    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setInitialRoute(user ? "App" : "Onboarding");
        };

        checkUser();
    }, []);

    if (initialRoute === null) {
        return null; // Or a loading spinner
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOption} initialRouteName={initialRoute}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={stackOptionWithHeader} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={stackOptionWithHeader} />
                <Stack.Screen name="App" component={TabView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;