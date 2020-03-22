import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Header, Stack, Text, Card, Box, ActionButton, StackList } from 'react-native-design-system';
import { getRequestsAtPincode } from '../networking/db';

const RequestScreen = (props) => {
    const [requests, setRequest] = useState([]);
    useEffect(() => {
        async function fetchRequest(){
            const data = await getRequestsAtPincode('123456');
            if(!data.error){
                setRequest(data.requests);
            }
            console.log('data', data)
        }
        fetchRequest();
    }, [null]);

    return (
        <View style={{flex: 1}}>
            <Header>Items Requested at 110110</Header>
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
