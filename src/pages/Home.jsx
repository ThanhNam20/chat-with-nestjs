import { MainContainer } from "@chatscope/chat-ui-kit-react";
import React, { useEffect } from "react";
import useSWR from "swr";
import ConversationInfoComponent from "../components/conversation-info/conversation-info.component";
import MainChatRoomComponent from "../components/main-chatroom/main-chatroom.component";
import SidebarComponent from "../components/sidebar/sidebar.component";
import useWindowDimensions from "../hooks/useWindowDimensions";
import axios from "axios";
import { environment } from "../environment";

const Home = () => {
  const { height, width } = useWindowDimensions();

  const fetcher = url => axios.get(environment.BASE_URL).then(res => res.data).catch(error);
  const { data, error } = useSWR('/api/data', fetcher)

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
