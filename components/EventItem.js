import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const EventItem = props => {
    return (
        <TouchableOpacity>
            <Image />
            <View>
                <Text>Title Event</Text>
                <Text>Start: Jul 20, 2020</Text>
                <Text>7:00 PM</Text>
            </View>
            <View>
                <Text>Participants</Text>
                <Text>1</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

});

export default EventItem;