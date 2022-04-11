import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../environment";
import { myHistory } from "./history.sercive";
import { localStorageService } from "./local-storage.service";

const private_axios = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

private_axios.interceptors.request.use(async (config) => {
  const access_token = localStorageService.getLocal("access-token");
  let newConfig = config;
  if (access_token) {
    newConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }
  return newConfig;
});

private_axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  if (!response) {
    // network error
    console.error(error);
    return;
  }

  if ([401].includes(response.status)) {
    myHistory.replace("/login");
    toast.error("this is toast error");
  }

  if ([404].includes(response.status)) {
    myHistory.replace("/login");
    toast.error("this is toast error");
  }
});

const getAllUsers = () => {
  return private_axios.get("/user/get-all-user");
};

const getUserChatRoom = (user_id) => {
  return private_axios.get(`/chatroom/get-chatroom?user_id=${user_id}`);
};

const getMessageInRoom = (room_id) => {
  return private_axios.get(`/chatroom/get-message-by-room?room_id=${room_id}`)
}

const createConversation = (data) =>{
  return private_axios.post(`/chatroom/create-chatroom`, data);
}

const getLastMessageWithRoom = (last_message_id) =>{
  return private_axios.get(`/chatroom/get-last-message-by-room?last_message_id=${last_message_id}`);
}

export const privateApiService = { getAllUsers, getUserChatRoom, getMessageInRoom, createConversation };
