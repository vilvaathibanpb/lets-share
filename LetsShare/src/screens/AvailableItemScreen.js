import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { Header, Stack, Text, Card, Box, StackList } from 'react-native-design-system';
import { getAvailableItemsAtPincode } from '../networking/db';

const AvailableItemScreen = () => {
    const [shared, setSharedItem] = useState([]);
    useEffect(() => {
        async function fetchRequest() {
            const data = await getAvailableItemsAtPincode('123456');
            if (!data.error) {
                setSharedItem(data.shared);
            }
            console.log('data', data)
        }
        fetchRequest();
    }, [null]);
    return (
        <View>
            <Header>Items Available at 110110</Header>
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
        </View>
    );
}

export default AvailableItemScreen;
