import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CreateEventScreen = props => {
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.textContainer}>
                <Text>Create Event Screen!</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        margin: 30
    }
});

export default CreateEventScreen;