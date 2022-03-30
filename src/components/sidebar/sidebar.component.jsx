import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/local-storage.service";
import { LOCAL_STORAGE } from "../../share/constant";

const SidebarComponent = (props) => {
  const { listRoom, userId } = props;
  const navigate = useNavigate();

  const listRoomUser = listRoom.map((item) => {
    const friend_data = item.list_user_in_room.find(
      (data) => data.user_id !== userId
    );
    return {
      ...item,
      friend_data,
    };
  });

  const goToConversationDetail = (item) => {
    localStorageService.setLocal(
      LOCAL_STORAGE.LAST_CONVERSATION_ID,
      item.room_id
    );
    navigate(`/chatroom/${item.room_id}`);
  };

  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
        {listRoomUser.map((item, key) => (
          <div onClick={() => goToConversationDetail(item)}>
            <Conversation
              key={key}
              name={item.friend_data.email}
              lastSenderName="Lilly"
              info="Last message"
            >
              <Avatar
                key={key}
                src={item.friend_data.user_avatar}
                name={item.friend_data.email}
                status="available"
              />
            </Conversation>
          </div>
        ))}
      </ConversationList>
    </Sidebar>
  );
};

export default SidebarComponent;
