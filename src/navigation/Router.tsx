import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Onboarding, SignIn } from '../screens/auth';

type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackOption: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false
};

const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOption}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;