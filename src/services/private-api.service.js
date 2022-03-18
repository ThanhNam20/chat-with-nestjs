import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../environment";
import { myHistory } from "./history.sercive";
import { localStorageService } from "./local-storage.service";

const private_axios = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type' : 'application/json'
  }
});

private_axios.interceptors.request.use(async (config) =>{
  const access_token = localStorageService.getLocal('access-token');
  let newConfig = config;
  if(access_token){
    newConfig = {
      ...config,
      headers: {
        Authenticaton: `Bearer ${access_token}`
      }
    }
  }
  return newConfig;
})

private_axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  if (!response) {
      // network error
      console.error(error);
      return;
  }

  if ([401].includes(response.status) ) {
    myHistory.replace('/login');
    toast.error("this is toast error"); 
  }

  if ([404].includes(response.status) ) {
    myHistory.replace('/register');
    toast.error("this is toast error"); 
  }
});


export default private_axios;