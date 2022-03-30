import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { environment } from "../environment";
import { localStorageService } from "../services/local-storage.service";
import { privateApiService } from "../services/private-api.service";
import { LOCAL_STORAGE } from "../share/constant";

const useSocketClient = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    privateApiService
      .getMessageInRoom(roomId)
      .then((message) => setMessages(message.data))
      .catch((error) => console.log(error));
    const access_token = localStorageService.getLocal(
      LOCAL_STORAGE.ACCESS_TOKEN
    );
    socketRef.current = socketIOClient(environment.BASE_SOCKET_URL, {
      query: { access_token, roomId },
    });

    socketRef.current.on(
      process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT,
      (message) => {
        const messageParse = JSON.parse(message);
        // const incomingMessage = {
        //   ...message,
        //   ownedByCurrentUser: message.senderId === socketRef.current.id,
        // };
        setMessages((messages) => [...messages, messageParse]);
      }
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(process.env.REACT_APP_PUT_NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useSocketClient;
