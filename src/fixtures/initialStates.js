
const initialStateLogin = {
    lEmail: '',
    lPassword: '',
}

const initialStateRegister = {
    rName: '',
    rEmail: '',
    rPassword: '',
    rPassword2: '',
}

const initialCheckValues = {
    rEmail: '',
    rPassword: '',
    rPassword2: ''
}

const initialValidationResults = {
    rEmailValid: false,
    rPasswordValid: false,
    rPasswordValid2: false,
}

export {
    initialStateLogin,
    initialStateRegister,
    initialValidationResults,
    initialCheckValues
}