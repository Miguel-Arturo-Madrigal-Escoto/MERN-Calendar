import { useEffect, useState } from 'react';
import validator from 'validator';


export const useValidate = ( initialCheckValues, initialValidationResults ) => {

    // useState: valores a validar
    const [ checkValues , setCheckValues ] = useState(initialCheckValues);
    
    // useState: resultados de las validaciones
    const [ resultsValidate, setResultsValidate ] = useState(initialValidationResults); 

    // handleInputChange: modificacion de los datos a validar
    const handleInputChange = ({ target }) => {
        setCheckValues({
            ...checkValues,
            [ target.name ]: target.value
        })
    }

    // Datos a validar 
    const { rEmail, rPassword, rPassword2 } = checkValues;

    // Realizar validaciones cada que cambian los 'checkValues'
    useEffect(() => {

        setResultsValidate({
            ...resultsValidate,
            rEmailValid: validator.isEmail(rEmail),
            rPasswordValid: validator.isStrongPassword(rPassword),
            rPasswordValid2: validator.equals(rPassword, rPassword2),
        });    
        
        
    }, [ checkValues ]);


    // [ datos a validar, modificar datos a validar, resultados de la validacion ]
    return [ checkValues, handleInputChange, resultsValidate ];

}
