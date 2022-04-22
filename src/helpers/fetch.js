
const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

    // localhost:4000/api/endpoint
    const url = `${ baseUrl }/${ endpoint }`;
    
    switch (method) {
        case 'GET':
            return fetch(url);
    
        default:
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });   
    }
}

export {
    fetchWithoutToken
}