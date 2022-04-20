
const initialState = {
    checking: true,               // Al cargar la app verificar si esta autenticado (checking).
    // uid: null, (ambos se agregan al autenticarse).
    // name: null
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'value':
            return state;
    
        default:
            return state;
    }

}