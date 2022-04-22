import { types } from '../types/types';

const initialState = {
    checking: true,               // Al cargar la app verificar si esta autenticado (checking).
    // uid: null, (ambos se agregan al autenticarse).
    // name: null
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
    
        default:
            return state;
    }

}