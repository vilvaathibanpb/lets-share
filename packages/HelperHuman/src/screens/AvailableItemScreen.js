import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { Header, Stack, Text, Card, FullScreenLoader, StackList } from 'react-native-design-system';
import { getAvailableItemsAtPincode } from '../networking/db';
import AsyncStorage from '@react-native-community/async-storage';

const AvailableItemScreen = () => {
    const [shared, setSharedItem] = useState([]);
    const [auth, setAuthInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserInfo() {
            let info = await AsyncStorage.getItem('authInfo');
            info = JSON.parse(info)
            setAuthInfo(info)
        }
        getUserInfo();
    }, [null]);

    useEffect(() => {
        async function fetchRequest() {
            console.log('auth', auth)
            const data = await getAvailableItemsAtPincode(auth.pincode);
            console.log('data', data)
            if (!data.error) {
                setSharedItem(data.shared);
            }
            setLoading(false);
        }
        fetchRequest();
    }, [auth]);

    return (
        <View style={{ flex: 1 }}>
            <Header>Zip Code : {auth.pincode}</Header>
            <StackList
                horizontalSpace="small"
                cropEndSpace={false}
                data={shared}
                keyExtractor={((item, i) => i.toString())}
                renderItem={({ item }) => {
                    const { name, contact, address } = item.user;
                    const tags = item.items.map(tag => tag.text);
                    return (
                        <Card>
                            <Stack space="xsmall">
                                <Text>
                                    {name}
                                </Text>
                                <Text color="grey">Contact: <Text>{contact}</Text></Text>
                                <Text color="grey">Address: <Text>{address}</Text></Text>
                                <Text color="grey">Request: <Text fontWeight="bold">{tags.join(', ')}</Text></Text>
                            </Stack>
                        </Card>
                    )
                }}
            />
            <FullScreenLoader loading={loading} />
        </View>
    );
}

export default AvailableItemScreen;
