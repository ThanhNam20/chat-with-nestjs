import axios from 'axios';

export function errorInterceptor() {
    axios.interceptors.response.use(null, (error) => {
        const { response } = error;
        if (!response) {
            // network error
            console.error(error);
            return;
        }
    
        if ([401, 403].includes(response.status) ) {
            // auto logout if 401 or 403 response returned from api
            console.log("hahahaha");
        }

        const errorMessage = response.data?.message || response.statusText;
        console.error('ERROR:', errorMessage);
    });
}