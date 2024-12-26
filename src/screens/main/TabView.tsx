import React from 'react'
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// Tabbars screns
import { Home, Favorite, Basket, Profile } from './tabs';
import { Colors, Fonts } from '../../constants';
import { LayoutDashboard, Heart, ShoppingBag, User } from 'lucide-react-native';

type TabParamList = {
    Home: undefined;
    Favorite: undefined;
    Basket: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabView: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <LayoutDashboard size={size} color={color} />

                    } else if (route.name === 'Favorite') {
                        return <Heart size={size} color={color} />

                    } else if (route.name === 'Basket') {
                        return <ShoppingBag size={size} color={color} />

                    } else if (route.name === 'Profile') {
                        return <User size={size} color={color} />
                    }
                },
                tabBarActiveTintColor: Colors.warning,
                tabBarInactiveTintColor: Colors.white,
                headerShown: false,
                headerShadowVisible: false,
                tabBarLabelStyle: {
                    fontSize: 13,
                },
                tabBarStyle: {
                    backgroundColor: Colors.primary
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Basket" component={Basket} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default TabView;

