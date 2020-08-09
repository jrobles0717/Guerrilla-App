import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import EventItem from '../components/EventItem';
import * as eventsActions from '../store/actions/events';
import Colors from '../constants/Colors';

const MainPageScreen = props => {
    const events = useSelector(state => state.events.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventsActions.loadEvents());
    }, [dispatch]);

    return (
        <FlatList 
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
    }
});

export default MainPageScreen;