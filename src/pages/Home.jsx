import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { localStorageService } from "../services/local-storage.service";
import { privateApiService } from "../services/private-api.service";
import { LOCAL_STORAGE } from "../share/constant";

const Home = () => {
  const { height, width } = useWindowDimensions();
  const [listUser, setlistUser] = useState(null);
  const [listRoom, setlistRoom] = useState(null);
  const userInfo = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );

  useEffect(() => {
    privateApiService
      .getAllUsers()
      .then((data) => setlistUser(data.data))
      .catch((error) => console.log(error));

    privateApiService
      .getUserChatRoom(userInfo.user_id)
      .then((user_room) => setlistRoom(user_room.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
      {(listRoom && listRoom.length > 0 && listUser && listUser.length > 0) ? (
        <MainContainer responsive>
          <SidebarComponent
            userId={userInfo.user_id}
            listRoom={listRoom}
            listUser={listUser}
          />
          <MainChatRoomComponent />
          {/* <ConversationInfoComponent /> */}
        </MainContainer>
      ) : null}
    </div>
  );
};

export default Home;
