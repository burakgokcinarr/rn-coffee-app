import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Onboarding, SignIn, SignUp } from '../screens/auth';
import TabView from '../screens/main/TabView';

type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    App: undefined;
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
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="App" component={TabView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;