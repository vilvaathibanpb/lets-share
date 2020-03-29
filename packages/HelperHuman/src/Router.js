import React, { useEffect, useState } from 'react';
import { theme } from 'react-native-design-system';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RequestScreen from './screens/RequestScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import AvailableItemScreen from './screens/AvailableItemScreen';
import CreateRequest from './screens/CreateRequest';
import SplashScreen from './screens/SplashScreen';
import CreateHelp from './screens/CreateHelp';
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator tabBarOptions={{ activeTintColor: theme.brandColor.primary }}>
            <Tab.Screen
                name="Requests"
                component={RequestScreen}
                options={{ 
                    title: `Requests - Nearby locations`,
                    tabBarIcon: ({ color, size }) => (<Feather name="home" size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name="Shared"
                component={AvailableItemScreen}
                options={{
                    title: 'Need help?',
                    tabBarIcon: ({ color, size }) => (<Feather name="users" size={size} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function MyStack() {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(null);
    
    useEffect(() => {
        async function checkUserInfo() {
            const auth = await AsyncStorage.getItem('authInfo');
            setTimeout(() => {
                setLoggedIn(auth);
                setLoading(false);
            }, 500);
        }
        checkUserInfo();
    }, [null]);

    if (loading){
        return <SplashScreen />
    }

    return (
        <Stack.Navigator headerMode="none">
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="Requests" component={MyTabs} />
                    <Stack.Screen name="CreateRequest" component={CreateRequest} />
                    <Stack.Screen name="CreateHelp" component={CreateHelp} />
                </>
            ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}

const Router = () => {
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

export default Router;