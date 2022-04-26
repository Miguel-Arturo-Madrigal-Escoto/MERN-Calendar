import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepare-events';
import { types } from '../types/types';

// Asincrono, guardar en la base de datos
export const eventStartAddNew = (event) => {

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok){
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(eventAddNew(event));
            }


        } catch (error) {
            console.log(error)
        }
        
    }

}

// sincrono, actualizar el store
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {
            // events/eventId
            const resp = await fetchWithToken(`events/${ event._id }`, event, 'PUT');
            const body = await resp.json();

            if (body.ok){
                // no puede ser el evento que retorna el body porque hay que parsear las fechas con el helper
                dispatch(eventUpdated(event));
            }
            else {
                Swal.fire('Error', body.errors.id.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});
 



export const eventStartLoading = () => {

    return async (dispatch) => {

        try {
            
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            
            if (body.ok){
                const events = prepareEvents(body.events)
                dispatch(eventLoaded(events));
            }

        } catch (error) {
            console.log(error);
        }

    }

}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventDeleted = () => ({ type: types.eventDeleted });
