import * as createEvent from './CreateEventScreen';
import * as eventsActions from '../store/actions/events';

import { Alert, Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import React, { useEffect, useState } from 'react';

import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import MapPreview from '../components/MapPreview';
import { useDispatch } from 'react-redux';
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

    const idEvent = selectedEvent.id;

    useEffect(() =>{
            console.log("selected Event: " + JSON.stringify(selectedEvent));
            console.log("selected Event: " + JSON.stringify(selectedEvent.id));
            console.log("selected Event: " + JSON.stringify(selectedEvent.title));
            console.log("selected Event: " + JSON.stringify(selectedEvent.description));
            console.log("selected Event: " + JSON.stringify(selectedEvent.date));
            console.log("selected Event: " + JSON.stringify(selectedEvent.time));
            console.log("selected Event: " + JSON.stringify(selectedEvent.name));
            console.log("selected Event: " + JSON.stringify(selectedEvent.image));
            console.log("selected Event: " + JSON.stringify(selectedEvent.address));
            console.log("selected Event: " + JSON.stringify(selectedEvent.lat));
            console.log("selected Event: " + JSON.stringify(selectedEvent.lng));
            console.log("idEvent: " + idEvent);
    },[]);

    const selectedLocation = { lat: selectedEvent.lat, lng: selectedEvent.lng };

    const showMapHandler =() => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    const nameValueHandler = () => {

        if(newName != ""){
            setNameValue([...nameValue, newName]);
            console.log("nameValue in nameValueHandler is: " + nameValue);
            console.log("newName in nameValueHandler is: " + newName);
            setNewName('');

        } else {
            Alert.alert(
                'Oops! You have must enter a name.',
                'Please try again!!',
                [
                    {text: 'OK', onPress: () => console.log('OK button has been clicked')}
                ],
                {
                    cancelable: true
                }
            );
        }
    };

    const confirmButtonHandler = () => {

        nameValueHandler();
        console.log("nameValue in confirmButtonHandler is:" + nameValue);
        console.log("idEvent before dispatching action: " + idEvent + " and nameValue: " + nameValue);
        //dispatch(eventsActions.searchedIdEvent(idEvent));
        //const result = dispatch(eventsActions.searchedIdEvent(idEvent));
        //console.log("result function searchIdEvent: " + JSON.stringify(result));
        // if (result) {
        //     dispatch(eventsActions.updateEvent(idEvent, nameValue));
        // } 
        //dispatch(eventsActions.updateEvent(idEvent, nameValue));
        //props.navigation.goBack();
        // console.log("using createEvent to get titleValue: " + createEvent.CreateEventScreen);
        
    };

    const nameChangeHandler = text => {
        //setNameValue(text);
        //setNameValue(searches => searches.concat(query));
        //setNameValue(searches => searches.concat(text));
        setNewName(text);
    };

    useEffect(() => {
        console.log("the array names: " + nameValue);
        console.log("the length of the array is: " + nameValue.length);
        if (nameValue.length > 0) {
            dispatch(eventsActions.updateEvent(idEvent, nameValue));
        } 
    }, [nameValue]);

    // useEffect(() => {
    //     setNameValue(selectedEvent.name);
    // },[])

    // const getHeader = () => {
    //     return (
    //         <>
    //         <View style={styles.form}>
    //             <Text style={styles.label}>Title</Text>
    //             <Text style={styles.textOutput}>{selectedEvent.title}</Text>
    //             <Text style={styles.label}>Description</Text>
    //             <Text style={styles.textOutput}>{selectedEvent.description}</Text>
    //             <Text style={styles.label}>Date</Text>
    //             <Text style={styles.textOutput}>{selectedEvent.date}</Text>
    //             <Text style={styles.label}>Time</Text>
    //             <Text style={styles.textOutput}>{selectedEvent.time}</Text>
    //             <View style={styles.nameContainer}>
    //                 <View>
    //                     <Text style={styles.label}>Name</Text>
    //                     <TextInput 
    //                         style={styles.textOutput}
    //                         onChangeText={nameChangeHandler}
    //                         value={newName}
    //                     />
    //                 </View>
    //                 <View>
    //                     <Button 
    //                     title="Confirm to Event"
    //                     onPress={confirmButtonHandler}
    //                     color={Colors.sky}
    //                     />
    //                 </View>
    //             </View>
    //         </View>
    //         <Text style={styles.confirmedList}>Confirmed List</Text>
    //         </>
    //     );
    // };

    // const getFooter = () => {
    //     return (
    //         <View style={styles.form}>
    //         <Text style={styles.textOutput}>{selectedEvent.name}</Text>
    //         {/* <ScrollView>
    //             <Text>Name1</Text>
    //             <Text>Name2</Text>
    //             <Text>Name3</Text>
    //             <Text>Name4</Text>
    //             <Text>Name5</Text>
    //             <Text>Name6</Text>
    //             <Text>Name7</Text>
    //             <Text>Name8</Text>
    //         </ScrollView> */}
    //         {/* <FlatList 
    //         data={events}
    //         /> */}
    //         <Image source={{uri: selectedEvent.image}} style={styles.image}/>
    //         <View style={styles.locationContainer}>
    //             <View style={styles.addressContainer}>
    //                 <Text style={styles.address}>{selectedEvent.address}</Text>
    //             </View>
    //             <MapPreview
    //             style={styles.mapPreview} 
    //             location={selectedLocation}
    //             onPress={showMapHandler}
    //             />
    //         </View>
    //         </View>
    //     );
    // };

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
                <View style={styles.nameContainer}>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput 
                            style={styles.textOutput}
                            onChangeText={nameChangeHandler}
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
            <Text>Confirmed List</Text>
                {/* <Text>Name1</Text>
                <Text>Name2</Text>
                <Text>Name3</Text>
                <Text>Name4</Text>
                <Text>Name5</Text>
                <Text>Name6</Text>
                <Text>Name7</Text> */}
                <Text style={styles.textOutput}>{nameValue.length != 0 
                ? (nameValue.map((e) => e + ", ")) 
                : (<Text>No name yet in the list!!</Text>)}</Text>
                
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
        // <FlatList
        // //data={events}
        // ListHeaderComponent={getHeader}
        // ListFooterComponent={getFooter}
        // />
    );
};

EventDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Event Details',
        headerLeft: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title="Go Back"
            iconName={Platform.OS === 'android' ? 'arrow-back' : 'ios-arrow-back'}
            onPress={() => {
                navData.navigation.navigate('MainPage');
            }}
            color={Colors.sky}
            />
        </HeaderButtons>
    };
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