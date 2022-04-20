import { useState } from 'react';

export const useForm = (initialForm) => {

    const [ formValues, setFormValues ] = useState(initialForm);

    // Recibe el evento 'e'
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    const reset = (initialForm) => {
        setFormValues(initialForm);
    }

    return [ formValues, handleInputChange, reset ];

}

