
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutTokenAxios = ( endpoint, data, method = 'GET') => {

    const url = `${ baseUrl }/${ endpoint }`;

    switch (method) {
        case 'GET':
            return fetch(url);
    
        case 'POST':
            return axios.post(url, data, {
                headers: {
                    'Content-type': 'application/json'
                }
            })

    }
}

export {
    fetchWithoutTokenAxios
}