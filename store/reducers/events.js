import { ADD_EVENT, DELETE_EVENT, SEARCH_ID_EVENT, SET_EVENTS, UPDATE_EVENT } from '../actions/events';

import Event from '../../models/event';

const initialState = {
    events: []
};

export default (state = initialState, action) => {
    const newState = {...state};
    console.log("action of events[] in reducers: " + JSON.stringify(action.eventData), action.type);
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
        //     const findEvent = state.events.find(e => action.eventData.id === e.id);
        //     console.log("findEvent: " + findEvent);
        //     const update = {...findEvent, name: action.eventData.name};
        //     console.log("updated Event: " + JSON.stringify(update));
        //     return {
        //         events: [...state.events, update]
        //     };
        case SEARCH_ID_EVENT:
            return {
                events: state.events.map(item => {
                    if (item.id === action.eventData.id) {  // Match the item by id and update its name
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
                    }
                    return item;
                  })
            }

        case UPDATE_EVENT:

            // return {
            //     events: state.events.map(item => {
            //         if (item.id === action.eventData.id) {  // Match the item by id and update its name
            //           return {
            //             ...item,
            //             name: action.eventData.name
            //           };
            //         }
            //         return item;
            //       })
            // }

            // const indexU = state.events.findIndex(e => e.id === action.eventData.id);
            // const indexU = state.events.map(item => {
            //             if (item.id === action.eventData.id) {  // Match the item by id and update its name
            //               return 
            //                 action.eventData.name;
            //             }
            //             else {
            //                 console.log("no found id event in reducers");
            //             }
            //           })
            // const updatedEvent = {...action.eventData, name: indexU};

            const findEvent = state.events.find(e => e.id === action.eventData.id);
            console.log("findEvent in reducers: " + findEvent);
            return {
                ...state,
                events: state.events.map(events => events.id === action.eventData.id ?
                    { ...events, name: action.eventData.name} : 
                    events
                    )
                        
            };

            // const index = state.events.findIndex(e => e.id === action.eventData.id);
            // const newArray = [...state.events];

            // return {
            //     ...state,
            //     events: newArray
            // }

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
