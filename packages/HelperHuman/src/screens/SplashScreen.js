import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { Text, colors } from 'react-native-design-system'

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../logo3.png')} resizeMode="contain" style={styles.logo} />
                <Text size="xxlarge" style={styles.text}> Helper Human </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    text: {
        color: colors.green[600]
    }
});
