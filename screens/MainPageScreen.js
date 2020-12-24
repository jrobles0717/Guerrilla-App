import * as CreateEvent from '../screens/CreateEventScreen';
import * as eventsActions from '../store/actions/events';

import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import EventItem from '../components/EventItem';
import { SwipeListView } from 'react-native-swipe-list-view';

const MainPageScreen = props => {
    const events = useSelector(state => state.events.events);
    const dispatch = useDispatch();
    const [eventId, setEventId] = useState(null);


    const eventOpenHandler = () => {
        console.log("Open swipe event!! event ID: " + eventId);
        //setEventId( );
    };

    const eventCloseHandler = () => {
        setEventId(null);
        console.log("Close swipe event!! event ID: " + eventId);
        //setEventId( );
    };

    const deleteEventHandler = useCallback((itemData) => {
        setEventId(itemData);
        console.log("deleting event!! ");

        //dispatch(eventsActions.deleteEvent(eventId));
        //props.navigation.reload();
    },[]);

    useEffect(() => {
        console.log("event id deleted: " + eventId);
        dispatch(eventsActions.deleteEvent(eventId));
        dispatch(eventsActions.loadEvents());
    },[eventId]);

    useEffect(() => {
        dispatch(eventsActions.loadEvents());
        //console.log(CreateEvent.WebSQLResultSet);
    }, [dispatch]);

    return (
        <SwipeListView 
        data={events}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <EventItem 
            image={itemData.item.image}
            title={itemData.item.title}
            date={itemData.item.date}
            time={itemData.item.time}
            numberConfirmed={itemData.item.name.length}
            onSelect={() => {
                props.navigation.navigate('EventDetail', {
                    eventTitle: itemData.item.title,
                    eventId: itemData.item.id
                });
            }}
            />
        )}
        renderHiddenItem={itemData => (
            <View style={styles.trashIcon}>
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Delete Event"
                iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                onPress={() => {
                    //dispatch(eventsActions.deleteEvent(nameValue));
                    //navData.navigation.navigate('CreateEvent');
                    deleteEventHandler(itemData.item.id);
                    //console.log("event id to delete: " + eventId);
                }}
                //style={styles.trashIcon}
                color={Colors.delete}
                />
                </HeaderButtons>
            </View>
        )}
        onRowOpen={eventOpenHandler}
        onRowClose={eventCloseHandler}
        leftOpenValue={105}
        rightOpenValue={0}
        />
    );
};

MainPageScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Events',
        headerRight: () => 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Add Event"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('CreateEvent');
                }}
                color={Colors.add}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 30
    },
    trashIcon: {
        padding: 25,
        //paddingBottom: 60,
        //paddingTop: 15, 
        marginLeft: 2,
        marginBottom: 2,
        flexDirection: "row", 
        width: 100, 
        justifyContent: "center", 
        backgroundColor: "pink"
    }
});

export default MainPageScreen;