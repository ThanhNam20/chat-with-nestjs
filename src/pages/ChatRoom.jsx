import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecoilValueInfo_UNSTABLE, useRecoilValue } from "recoil";
import ConversationInfoComponent from "../components/conversation-info/conversation-info.component";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useSocketClient from "../hooks/useSocketClient";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { localStorageService } from "../services/local-storage.service";
import { privateApiService } from "../services/private-api.service";
import { LOCAL_STORAGE } from "../share/constant";
import { RoomStateService } from "../store/roomState";
import { UserStateService } from "../store/userState";

const ChatRoomScreen = () => {
  const { id } = useParams();
  const { messages, sendMessage } = useSocketClient(id);
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const listRoomsState = useRecoilValue(RoomStateService.roomState);
  const listUsersState = useRecoilValue(UserStateService.UserState);

  const userInfo = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );

  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <SidebarComponent
          userId={userInfo.user_id}
          listRoom={listRoomsState}
          listUser={listUsersState}
        />
        <MainChatRoomComponent
          sendMessage={sendMessage}
          listMessages={messages}
        />
        <ConversationInfoComponent />
      </MainContainer>
    </div>
  );
};

export default ChatRoomScreen;
