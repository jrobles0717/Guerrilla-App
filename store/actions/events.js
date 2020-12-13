import * as FileSystem from 'expo-file-system';
import { insertEvent, fetchEvents, updatesEvent, removeEvent } from '../../helpers/db';
import ENV from '../../env';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SET_EVENTS = 'SET_EVENTS';
export const UPDATE_EVENT = 'UPDATE_EVENT';

export const addEvent = (title, description, date, time, name, image, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat
        },${location.lng}&key=${ENV.googleApiKey}`
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Something went wrong!');
        }

        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertEvent(
                title,
                description,
                date,
                time,
                name,
                newPath,
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);
            dispatch({
                type: ADD_EVENT,
                eventData: {
                    id: dbResult.insertId,
                    title: title,
                    description: description,
                    date: date,
                    time: time,
                    name: name,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const deleteEvent = (id) => {
    return async dispatch => {
        

        try {
            const dbResult = await removeEvent(id);
            console.log(dbResult);
            dispatch({
                type: DELETE_EVENT,
                eventData: {
                    id: dbResult.insertId
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const updateEvent = (name) => {
    return async dispatch => {
        
        try {
            
            const dbResult = await updatesEvent(name);
            console.log(dbResult);
            dispatch({
                type: UPDATE_EVENT,
                eventData: {
                    id: dbResult.insertId,
                    name: name
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadEvents = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchEvents();
            console.log(dbResult);
            dispatch({ type: SET_EVENTS, events: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};