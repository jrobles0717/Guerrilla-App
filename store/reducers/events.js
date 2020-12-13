import { ADD_EVENT, SET_EVENTS, UPDATE_EVENT, DELETE_EVENT } from '../actions/events';
import Event from '../../models/event';

const initialState = {
    events: []
};

export default (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_EVENTS:
            return {
                events: action.events.map(
                    ev =>
                    new Event(
                        ev.id.toString(),
                        ev.title,
                        ev.description,
                        ev.date,
                        ev.time,
                        ev.name,
                        ev.image,
                        ev.address,
                        ev.lat,
                        ev.lng
                    )
                )
            };
        case ADD_EVENT:
            const newEvent = new Event(
                action.eventData.id.toString(),
                action.eventData.title,
                action.eventData.description,
                action.eventData.date,
                action.eventData.time,
                action.eventData.name,
                action.eventData.image,
                action.eventData.address,
                action.eventData.coords.lat,
                action.eventData.coords.lng
            );
            return {
                events: state.events.concat(newEvent)
            };
        case DELETE_EVENT:
            const indexD = state.events.findIndex(e => e.id === action.eventData.id);
            return [
                ...state.events.slice(0, indexD),
                ...state.events.slice(indexD + 1)
            ];
        // case UPDATE_EVENT:
        //     const findEvent = state.find(e => action.eventData.id.toString() === e.id);
        //     console.log("findEvent: " + findEvent);
        //     const update = {...findEvent, name: action.eventData.name};
        //     console.log("updated Event: " + update);
        //     return {
        //         events: [...state.events, update]
        //     };
        case UPDATE_EVENT:
            const indexU = state.events.findIndex(e => e.id === action.eventData.id);
            const updatedEvent = {...action.eventData, events: state.events[indexU].name};
            return {
                ...state.events.slice(0, indexU),
                updatedEvent,
                ...state.events.slice(indexU + 1)
                        
            };
            // return [
            //     state.events.map(e => {
            //         if(e.id === action.eventData.id) {
            //             return {
            //                 ...e,
            //                 events: action.eventData.name
            //             }
            //         }
            //         else {
            //             return e;
            //         }
            //     })
            // ];
        default:
            return state;
    }
};
