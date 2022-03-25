import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarComponent = (props) => {
  const { listRoom, listUser, userId } = props;
  const [image, setImage] = useState("https://loremflickr.com/320/240");
  const navigate = useNavigate();

  listRoom.forEach((item) => {
    const friend_data = item.list_user_in_room.find(
      (data) => data.user_id !== userId
    );
    if (friend_data) {
      item["friend_data"] = friend_data;
    }
  });

  const goToConversationDetail = (item) =>{
    navigate(`/chatroom/${item.room_id}`)
  }

  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
        {listRoom.map((item, key) => (
          <div onClick={() => goToConversationDetail(item)}>
            <Conversation
              key={key}
              name={item.friend_data.email}
              lastSenderName="Lilly"
              info="Last message"
            >
              <Avatar
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
