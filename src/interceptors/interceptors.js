
import axios from 'axios';
import { environment } from '../environment';


export const jwtInterceptor = () =>{
  axios.interceptors.request.use((request) =>{
    console.log(request);
    // add auth header with jwt if account is logged in and request is to the api url
    // const account = accountService.accountValue;
    // const isLoggedIn = account?.token;
    // const isApiUrl = request.url.startsWith(environment.BASE_URL);

    // if (isLoggedIn && isApiUrl) {
    //     request.headers.common.Authorization = `Bearer ${account.token}`;
    // }
    // return request;
  })
}
