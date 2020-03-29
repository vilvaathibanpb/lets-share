import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Stack, Input, Button, Header } from 'react-native-design-system';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { createUser } from '../networking/db';
import { FormattedMessage } from "react-intl";

const CreateHelp = ({ navigation }) => {
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
        const { userId, name, pincode, contact, } = auth;
        if(!text){ return; }
        setLoading(true);
        const itemArray = text.split(",").map(tag => ({ text: tag }));
        const data = await createUser({ name, pincode, contact, items: itemArray });
        if (data) {
            //redirect
            setLoading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Items submitted', ToastAndroid.SHORT);
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
                Create Help
            </Header>
            <Stack horizontalSpace="medium" cropEndSpace={false}>
                <Input
                    autoFocus
                    outline
                    label={<FormattedMessage id="I_can_share" defaultMessage="Rice, Wheat, Oil" />}
                    placeholder="Enter items you can share"
                    value={text}
                    onChangeText={setText}
                />
                <Button outline onPress={onSubmitPress} loading={loading}>
                    <FormattedMessage id="I_can_share" defaultMessage="Make a I can share" />
                </Button>
            </Stack>
        </View>
    )
}

export default CreateHelp;
