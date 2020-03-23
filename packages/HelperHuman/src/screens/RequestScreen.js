import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Header, Stack, Text, Card, ActionButton, StackList, FullScreenLoader } from 'react-native-design-system';
import { getRequestsAtPincode } from '../networking/db';
import AsyncStorage from '@react-native-community/async-storage';

const RequestScreen = (props) => {
    const [requests, setRequest] = useState([]);
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
        async function fetchRequest(){
            const data = await getRequestsAtPincode(auth.pincode);
            if(!data.error){
                setRequest(data.requests);
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
                data={requests}
                keyExtractor={((item, i) => i.toString())}
                renderItem={({item}) => {
                    const { name, contact, address } = item.user;
                    const tags = item.items.map(tag => tag.text);
                    return (
                        <Card>
                            <Stack space="xsmall">
                                <Text>{name}</Text>
                                <Text color="grey">Contact: <Text>{contact}</Text></Text>
                                <Text color="grey">Address: <Text>{address}</Text></Text>
                                <Text color="grey">Request: <Text fontWeight="bold">{tags.join(', ')}</Text></Text>
                            </Stack>
                        </Card>
                    )
                }}
            />
            <ActionButton style={styles.actionButton} onPress={() => props.navigation.navigate('Create')} />
            <FullScreenLoader loading={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
    }
});

export default RequestScreen;
