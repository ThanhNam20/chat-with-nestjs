import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../environment";
import { myHistory } from "./history.sercive";


const public_axios = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

public_axios.interceptors.response.use(null, (error) => {
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

const loginEmail =  (userInfo) => {
  return public_axios.post('/auth/login', {
    email: userInfo.email,
    password: userInfo.password,
  });
}

export const publicApiService = { loginEmail };
