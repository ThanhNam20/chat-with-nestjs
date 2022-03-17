import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React from "react";
import ConversationInfoComponent from "../components/conversation-info/conversation-info.component";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Home = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <SidebarComponent />
        <MainChatRoomComponent />
        <ConversationInfoComponent />
      </MainContainer>
    </div>
  );
};

export default Home;
