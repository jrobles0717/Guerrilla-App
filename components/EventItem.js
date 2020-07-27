import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const EventItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.eventItem}>
            <Image style={styles.image} source={{ uri: props.image }}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.date}>Start: {props.date}</Text>
                <Text style={styles.time}>{props.time}</Text>
            </View>
            <View style={styles.confirmedContainer}>
                <Text style={styles.participants}>Participants</Text>
                <Text style={styles.numberConfirmed}>1</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    eventItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Colors.primary,
        borderWidth: 1
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start' 
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    date: {
        color: 'black',
        fontSize: 16
    },
    time: {
        color: 'black',
        fontSize: 16
    },
    confirmedContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    participants: {
        color: 'black',
        fontSize: 14
    },
    numberConfirmed: {
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Colors.header,
        borderWidth: 1
    }
});

export default EventItem;