import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import MapPreview from '../components/MapPreview';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const EventDetailScreen = props => {
    const dispatch = useDispatch();
    //const events = useSelector(state => state.events.events);
    const [nameValue, setNameValue] = useState([]);
    const [newName, setNewName] = useState('');

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

    const confirmButtonHandler = () => {
        //dispatch();
        setNameValue([newName, ...nameValue]);
        setNewName('');
    };

    const nameChangeHandler = text => {
        //setNameValue(text);
        //setNameValue(searches => searches.concat(query));
        //setNameValue(searches => searches.concat(text));
        setNameValue(text);
    };

    const getHeader = () => {
        return (
            <>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <Text style={styles.textOutput}>{selectedEvent.title}</Text>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.textOutput}>{selectedEvent.description}</Text>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.textOutput}>{selectedEvent.date}</Text>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.textOutput}>{selectedEvent.time}</Text>
                <View style={styles.nameContainer}>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput 
                            style={styles.textOutput}
                            onChangeText={e => setNewName(e)}
                            value={newName}
                        />
                    </View>
                    <View>
                        <Button 
                        title="Confirm to Event"
                        onPress={confirmButtonHandler}
                        color={Colors.sky}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.confirmedList}>Confirmed List</Text>
            </>
        );
    };

    const getFooter = () => {
        return (
            <View style={styles.form}>
            <Text style={styles.textOutput}>{selectedEvent.name}</Text>
            {/* <ScrollView>
                <Text>Name1</Text>
                <Text>Name2</Text>
                <Text>Name3</Text>
                <Text>Name4</Text>
                <Text>Name5</Text>
                <Text>Name6</Text>
                <Text>Name7</Text>
                <Text>Name8</Text>
            </ScrollView> */}
            {/* <FlatList 
            data={events}
            /> */}
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
            </View>
        );
    };

    return (
        // <ScrollView>
        //     <View style={styles.form}>
        //         <Text style={styles.label}>Title</Text>
        //         <Text style={styles.textOutput}>{selectedEvent.title}</Text>
        //         <Text style={styles.label}>Description</Text>
        //         <Text style={styles.textOutput}>{selectedEvent.description}</Text>
        //         <Text style={styles.label}>Date</Text>
        //         <Text style={styles.textOutput}>{selectedEvent.date}</Text>
        //         <Text style={styles.label}>Time</Text>
        //         <Text style={styles.textOutput}>{selectedEvent.time}</Text>
        //         <View style={styles.nameContainer}>
        //             <View>
        //                 <Text style={styles.label}>Name</Text>
        //                 <Text style={styles.textOutput}>{selectedEvent.name}</Text>
        //             </View>
        //             <View>
        //                 <Button 
        //                 title="Confirm to Event"
        //                 onPress={confirmButtonHandler}
        //                 color={Colors.sky}
        //                 />
        //             </View>
        //         </View>
        //     </View>
        //     <Text>Confirmed List</Text>
        //     <ScrollView>
        //         <Text>Name1</Text>
        //         <Text>Name2</Text>
        //         <Text>Name3</Text>
        //         <Text>Name4</Text>
        //         <Text>Name5</Text>
        //         <Text>Name6</Text>
        //         <Text>Name7</Text>
        //     </ScrollView>
        //     <Image source={{uri: selectedEvent.image}} style={styles.image}/>
        //     <View style={styles.locationContainer}>
        //         <View style={styles.addressContainer}>
        //             <Text style={styles.address}>{selectedEvent.address}</Text>
        //         </View>
        //         <MapPreview
        //         style={styles.mapPreview} 
        //         location={selectedLocation}
        //         onPress={showMapHandler}
        //         />
        //     </View>
        // </ScrollView>
        <FlatList
        //data={events}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
        />
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
      },
      nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      confirmedList: {
          margin: 30,
          fontSize: 18,
        marginBottom: 15,
        marginTop: 1
      }
});

export default EventDetailScreen;