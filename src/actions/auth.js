import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../helpers/fetch';
import { types } from '../types/types';
//import { fetchWithoutTokenAxios } from '../helpers/fetchAxios';

export const startLogin = (email, password) => {
    // asincrona
    return async ( dispatch ) => {
    
        // ** FETCH API ** //
        const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        //console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }
        else {
            const error = body.errors? body.errors.email.msg : body.msg;

            Swal.fire(
                'Error',
                error,
                'error'
              )
        }


        // ** AXIOS ** //
        // try {

        //     const resp = await fetchWithoutTokenAxios('auth', { email, password }, 'POST');
        //     const body = resp.data;

        //     console.log({ body });
            
        // } catch (error) {
        //     console.log('Error en la peticion');
        // }
        
    }
}


export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        // ** FETCH API ** //
        const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            
        } else {
            const error = body.errors? body.errors.email.msg : body.msg;
            Swal.fire(
                'Error',
                error,
                'error'
            )
        }

    }
}


const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});