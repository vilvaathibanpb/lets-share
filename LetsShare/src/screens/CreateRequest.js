import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Stack, Input, Button, Header } from 'react-native-design-system';
import { Feather } from '@expo/vector-icons';

const onSubmitPress = () => {

}

const CreateRequest = ({ navigation }) => {
    const [text, setText] = useState('');
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
                    outline
                    placeholder="Enter your request"
                    value={text}
                    onChangeText={setText}
                />
                <Button outline onPress={onSubmitPress}>
                    Make a request
                </Button>
            </Stack>
        </View>
    )
}

export default CreateRequest;
