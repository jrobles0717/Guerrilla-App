import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import MapPreview from '../components/MapPreview';

import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const EventDetailScreen = props => {
    const eventId = props.navigation.getParam('eventId');
    const selectedEvent = useSelector( state => 
        state.events.events.find(event => event.id === eventId)
    );

    const selectedLocation = { lat: selectedEvent.lat, lng: selectedEvent.lng };

    const showMapHandler =() => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <Text style={styles.textOutput}>{selectedEvent.title}</Text>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.textOutput}>{selectedEvent.description}</Text>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.textOutput}>{selectedEvent.date}</Text>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.textOutput}>{selectedEvent.time}</Text>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.textOutput}>{selectedEvent.name}</Text>
            </View>
            <Image source={{uri: selectedEvent.image}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedEvent.address}</Text>
                </View>
                <MapPreview
                style={styles.mapPreview} 
                location={selectedLocation}
                onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textOutput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        fontSize: 20,
        color: Colors.header
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
      },
      locationContainer: {
        marginVertical: 20,
        width: '100%',
        height: 200,
        maxWidth: 350,
        marginLeft: 10,
        marginBottom: 150,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
      },
      addressContainer: {
        padding: 20
      },
      address: {
        color: Colors.primary,
        textAlign: 'center'
      },
      mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
      }
});

export default EventDetailScreen;