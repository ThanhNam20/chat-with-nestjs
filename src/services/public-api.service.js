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
  
  if ([401].includes(response.status)) {
    toast.error("this is toast error");
  }

  if ([404, 400, 403].includes(response.status)) {
    toast.error("this is toast error");
  }
});

const loginEmail = (userInfo) => {
  return public_axios.post("/auth/login", {
    email: userInfo.email,
    password: userInfo.password,
  });
};

const registerEmail = (userInfo) => {
  return public_axios.post("/auth/register", {
    email: userInfo.email,
    password: userInfo.password,
  });
};

const loginGoogle = (userInfo) => {
  return public_axios.post("/auth/google", {
    email: userInfo.email,
    uid: userInfo.uid,
    user_avatar: userInfo.user_avatar,
  });
};

export const publicApiService = { loginEmail, registerEmail, loginGoogle };
