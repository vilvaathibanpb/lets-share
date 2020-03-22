import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'react-native-design-system';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import Constants from 'expo-constants';
import RequestScreen from './screens/RequestScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AvailableItemScreen from './screens/AvailableItemScreen';
import CreateRequest from './screens/CreateRequest';
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator tabBarOptions={{ activeTintColor: theme.brandColor.primary }}>
            <Tab.Screen
                name="Requests"
                component={RequestScreen}
                options={{ 
                    title: 'Requests in your locality',
                    tabBarIcon: ({ color, size }) => (<Feather name="home" size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name="Shared"
                component={AvailableItemScreen}
                options={{
                    title: 'People offering help',
                    tabBarIcon: ({ color, size }) => (<Feather name="users" size={size} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Requests" component={MyTabs} />
            <Stack.Screen name="Create" component={CreateRequest} />
        </Stack.Navigator>
    );
}

const Router = () => {
    return(
        <NavigationContainer>
            <View style={styles.statusBar} />
            <MyStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: theme.brandColor.primary,
        height: Constants.statusBarHeight,
    },
});

export default Router;