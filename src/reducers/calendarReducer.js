
import { types } from '../types/types';

/* const initialState = {
    events: [{
        // formato de los eventos del calendario
        id: new Date().getTime(),
        title: 'Cumpleaños del Jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        allDay: false,
        //informacion adicional agregada por nosotros
        user: {
          _id: '123',
          name: 'Miguel',
        }
    }],
    activeEvent: null
}; */

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            }
        
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => 
                    event.id === action.payload.id ? action.payload
                    : event
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            }
    
        default:
            return state;
    }

}