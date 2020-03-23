import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Stack, Input, Button, Header } from 'react-native-design-system';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { createRequest } from '../networking/db';

const CreateRequest = ({ navigation }) => {
    const [text, setText] = useState('');
    const [auth, setAuthInfo] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function getUserInfo() {
            let info = await AsyncStorage.getItem('authInfo');
            info = JSON.parse(info)
            setAuthInfo(info)
        }
        getUserInfo();
    }, [null]);

    const onSubmitPress = async () => {
        const { userId, pincode } = auth;
        setLoading(true);
        const data = await createRequest({ userId, pincode, text });
        if (data) {
            //redirect
            setLoading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Request submitted', ToastAndroid.SHORT);
            }
            navigation.goBack();
        } else {
            setLoading(false);
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Please try again', ToastAndroid.SHORT);
            }
        }

    }

    return (
        <View>
            <Header
                leftIcon={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={26} color={"#fff"} />
                    </TouchableOpacity>
                }
            >
                Create Request
            </Header>
            <Stack horizontalSpace="medium" cropEndSpace={false}>
                <Input
                    autoFocus
                    outline
                    placeholder="Enter your request"
                    value={text}
                    onChangeText={setText}
                />
                <Button outline onPress={onSubmitPress} loading={loading}>
                    Make a request
                </Button>
            </Stack>
        </View>
    )
}

export default CreateRequest;
