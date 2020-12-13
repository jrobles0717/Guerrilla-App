import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const width = Dimensions.get("window").width

const EventItem = props => {

    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.eventItem}>
            <Image style={styles.image} source={{ uri: props.image }}/>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.date}>Start: {props.date}</Text>
                    <Text style={styles.time}>{props.time}</Text>
                </View>
                <View style={styles.confirmedContainer}>
                    <Text style={styles.participants}>Participants</Text>
                    <Text style={styles.numberConfirmed}>{props.numberConfirmed}</Text>
                </View>
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
        alignItems: 'center',
        //padding: 10,
        borderWidth: 1, 
        width: width,
        backgroundColor: "green"
        
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
        marginLeft: 15,
        width: 150,
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
        //marginLeft: 15,
        width: 150,
        justifyContent: 'center',
        
    },
    participants: {
        color: 'black',
        fontSize: 14
    },
    numberConfirmed: {
        width: 50,
        height: 50,
        borderRadius: 25,
        //backgroundColor: '#ccc',
        borderColor: Colors.header,
        borderWidth: 3,
        flex: 1,
        fontSize: 36,
        marginLeft: 15,
        marginTop: 10,
        paddingLeft: 12
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        // padding: 10,
        // borderWidth: 1, 
        // width: width,
        // backgroundColor: "green"
        
    }
});

export default EventItem;