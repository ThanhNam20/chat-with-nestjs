import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { localStorageService } from "../services/local-storage.service";
import { privateApiService } from "../services/private-api.service";
import { LOCAL_STORAGE } from "../share/constant";
import { RoomStateService } from "../store/roomState";
import { UserStateService } from "../store/userState";

const Home = () => {

  const { height, width } = useWindowDimensions();
  const [listUser, setlistUser] = useState(null);
  const [listRoom, setlistRoom] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const setRoomState = useSetRecoilState(RoomStateService.roomState);
  const setUsersState = useSetRecoilState(UserStateService.UserState);

  useEffect(() => {
    const userInfoLocal = JSON.parse(
      localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
    );
    const lastConversationId = localStorageService.getLocal(
      LOCAL_STORAGE.LAST_CONVERSATION_ID
    );

    if (!userInfoLocal) {
      navigate("/login");
      return;
    }
    // if(lastConversationId) {
    //   navigate(`chatroom/${lastConversationId}`);
    //   return;
    // }

    setUserInfo(userInfoLocal);
    privateApiService
      .getAllUsers()
      .then((data) => {
        setlistUser(data.data);
        setUsersState(data.data);
      })
      .catch((error) => console.log(error));

    privateApiService
      .getUserChatRoom(userInfoLocal.user_id)
      .then((user_room) => {
        setlistRoom(user_room.data);
        setRoomState(user_room.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
      {listRoom && listRoom.length > 0 && listUser && listUser.length > 0 ? (
        <MainContainer responsive>
          <SidebarComponent
            userId={userInfo.user_id}
            listRoom={listRoom}
          />
          {/* <MainChatRoomComponent /> */}
          {/* <ConversationInfoComponent /> */}
        </MainContainer>
      ) : null}
    </div>
  );
};

export default Home;
