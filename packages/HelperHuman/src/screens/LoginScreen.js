import React, { useReducer, useEffect } from 'react';
import { View, ScrollView, ToastAndroid, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Header, Stack, Input, Button } from 'react-native-design-system';
import { createUser } from '../networking/db';
import AsyncStorage from '@react-native-community/async-storage';
import { FormattedMessage } from "react-intl";

const INITIAL_STATE = {
    name: '',
    pincode: '',
    contact: '',
    address: '',
    items: '',
    loading: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return { ...state, name: action.payload};
        case 'CHANGE_PINCODE':
            return { ...state, pincode: action.payload };
        case 'CHANGE_CONTACT':
            return { ...state, contact: action.payload };
        case 'CHANGE_ADDRESS':
            return { ...state, address: action.payload };
        case 'CHANGE_ITEMS':
            return { ...state, items: action.payload };
        case 'TOGGLE_LOADER':
            return { ...state, loading: action.payload };
        default:
            throw new Error();
    }
}

const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        async function checkUserInfo() {
            const auth = await AsyncStorage.getItem('authInfo');
            if (auth) {
                navigation.navigate("Requests");
            }
        }
        checkUserInfo();
    }, [null]);

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const onSubmitPress = async () => {
        const { name, pincode, contact, address, items } = state;
        if (name === "" || pincode === "" || contact === "") {
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Please enter name, pincode and contact both', ToastAndroid.SHORT);
            }
        }
        dispatch({ type: 'TOGGLE_LOADER', payload: true });
        const itemArray = items.split(",").map(tag => ({ text: tag }));
        const data = await createUser({ name, pincode, contact, address, items: itemArray });
        if (!data.error) {
            //redirect
            dispatch({ type: 'TOGGLE_LOADER', payload: false });
            await AsyncStorage.setItem('authInfo', JSON.stringify({ name, pincode, contact, userId: data.userId }))
            navigation.navigate("Requests");
        } else {
            if (Platform.OS === 'android') {
                dispatch({ type: 'TOGGLE_LOADER', payload: false });
                return ToastAndroid.show('Please try again', ToastAndroid.SHORT);
            }
        }
    }

    return (
        <View>
            <Header>Get Onboard</Header>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView>
                        <Stack horizontalSpace="medium" cropEndSpace={false}>
                            <Input
                                // label={<FormattedMessage id="NAME" defaultMessage="Name" />}
                                value={state.name}
                                outline
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => this.pin.focus()}
                                onChangeText={payload => dispatch({ type: 'CHANGE_NAME', payload })}
                            />
                            <Input
                                label="Pincode"
                                ref={pin => this.pin = pin}
                                placeholder="110011"
                                keyboardType="number-pad"
                                value={state.pincode}
                                outline
                                returnKeyType="next"
                                onSubmitEditing={() => this.ct.focus()}
                                onChangeText={payload => dispatch({ type: 'CHANGE_PINCODE', payload })}
                            />
                            <Input
                                label="Contact"
                                ref={ct => this.ct = ct}
                                placeholder="9876543210"
                                keyboardType="phone-pad"
                                value={state.contact}
                                outline
                                returnKeyType="next"
                                onSubmitEditing={() => this.add.focus()}
                                onChangeText={payload => dispatch({ type: 'CHANGE_CONTACT', payload })}
                            />
                            <Input
                                label="Address"
                                ref={add => this.add = add}
                                placeholder="Optional"
                                value={state.address}
                                outline
                                multiline
                                numberOfLines={3}
                                textAlignVertical={"top"}
                                returnKeyType="next"
                                onSubmitEditing={() => this.item.focus()}
                                onChangeText={payload => dispatch({ type: 'CHANGE_ADDRESS', payload })}
                            />
                            <Input
                                label="Items"
                                ref={item => this.item = item}
                                placeholder="Rice, potato, pasta"
                                value={state.items}
                                outline
                                multiline
                                numberOfLines={3}
                                textAlignVertical={"top"}
                                onChangeText={payload => dispatch({ type: 'CHANGE_ITEMS', payload })}
                            />
                            <Button loading={state.loading} onPress={() => onSubmitPress(state)}>
                                Save
                            </Button>
                        </Stack>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

export default LoginScreen;
