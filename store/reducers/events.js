import { ADD_EVENT, SET_EVENTS } from '../actions/events';
import Event from '../../models/event';

const initialState = {
    events: []
};

export default (state = initialState, action) => {
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
            default:
                return state;
    }
};
