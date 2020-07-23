import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetailScreen = props => {
    return (
        <View style={styles.textContainer}>
            <Text>Event Detail Screen!</Text>
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

export default EventDetailScreen;