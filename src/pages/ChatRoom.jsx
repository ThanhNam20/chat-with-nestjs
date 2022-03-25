import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ConversationInfoComponent from "../components/conversation-info/conversation-info.component";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useSocketClient from "../hooks/useSocketClient";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { privateApiService } from "../services/private-api.service";

const ChatRoomScreen = () => {
  const { id } = useParams();
  const { messages, sendMessage } = useSocketClient(id);
  const { height, width } = useWindowDimensions();
  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
      <MainContainer responsive>
        {/* <SidebarComponent /> */}
        <MainChatRoomComponent sendMessage={sendMessage} listMessages={messages} />
        <ConversationInfoComponent />
      </MainContainer>
    </div>
  );
};

export default ChatRoomScreen;
