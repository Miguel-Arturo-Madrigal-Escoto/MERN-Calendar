import Swal from 'sweetalert2';
import { googleAuthProvider, githubAuthProvider } from '../firebase/config';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventCleared } from './calendar';
//import { fetchWithoutTokenAxios } from '../helpers/fetchAxios';

export const startLogin = (email, password) => {
    // asincrona
    return async ( dispatch ) => {
    
        // ** FETCH API ** //
        try {
            
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

        } catch (error) {
            console.log(error)
        }
               
    }
}


export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        try {
            
            // ** FETCH API ** //
            const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
            const body = await resp.json();

            if (body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                
                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }));
                
            } else {
                const error = body.errors? body.errors.email.msg : body.msg;
                Swal.fire(
                    'Error',
                    error,
                    'error'
                )
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const startRegisterWithFirebase = () => {

    return async (dispatch) => {

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider).then( async ({ user }) => {
    
            const data = {
                uid: user.uid,
                email: user.email,
                name: user.displayName
            }

            const resp = await fetchWithoutToken('auth/login', data, 'POST');
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
                const error = body.errors? body.errors.email.msg : body.msg;
                Swal.fire(
                    'Error',
                    error,
                    'error'
                )
            }

        }).catch(err => {

        });
    }
} 

export const startRegisterWithGithub = () => {

    return async (dispatch) => {

        const auth = getAuth();
        signInWithPopup(auth, githubAuthProvider)
        .then(async ({ user }) => {
            const data = {
                uid: user.uid,
                email: user.email,
                name: user.displayName
            }

            //api
            const resp = await fetchWithToken('auth/login', data, 'POST');
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
                    'Error en la autenticacion',
                    'error'
                )
            }
        })
        .catch(({ code }) => {
            Swal.fire(
                'Ha ocurrido un error',
                code,
                'error'
            );
        })

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
            }));
            
        }
        /* else {
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        } */

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
        const tokenInitDateLocalStorage = !!(localStorage.getItem('token-init-date') || '')
        if (tokenLocalStorage && tokenInitDateLocalStorage){
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            dispatch(eventCleared());
            dispatch(logout());
        }
    }
}

export const logout = () => ({ type: types.authLogout });

