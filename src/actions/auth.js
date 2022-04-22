import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
//import { fetchWithoutTokenAxios } from '../helpers/fetchAxios';

export const startLogin = (email, password) => {
    // asincrona
    return async ( dispatch ) => {
    
        // ** FETCH API ** //
        const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await resp.json();


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

export const startChecking = () => {
    return async (dispatch) => {

        const tokenLocalStorage = !!(localStorage.getItem('token') || '')

        if (!tokenLocalStorage){
            return dispatch(checkingFinish());
        }


        // el token esta en el localstorage
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            
        }
        else {
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        }

        dispatch(checkingFinish());
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        const tokenLocalStorage = !!(localStorage.getItem('token') || '')
        if (tokenLocalStorage){
            localStorage.removeItem('token');
            dispatch(logout());
        }
    }
}

export const logout = () => ({ type: types.authLogout });

