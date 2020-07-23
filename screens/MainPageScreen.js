import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainPageScreen = props => {
    return (
        <View style={styles.textContainer}>
            <Text>Events Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MainPageScreen;