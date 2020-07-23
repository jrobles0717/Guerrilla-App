import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateEventScreen = props => {
    return (
        <View style={styles.textContainer}>
            <Text>Create Event Screen!</Text>
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

export default CreateEventScreen;