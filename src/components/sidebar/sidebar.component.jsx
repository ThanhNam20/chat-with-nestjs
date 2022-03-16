import {
  Avatar,
  Conversation, ConversationList, Search, Sidebar
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";

const SidebarComponent = () => {
  const [image, setImage] = useState('https://loremflickr.com/320/240');
  return (
    <Sidebar position="left" scrollable={false}>
    <Search placeholder="Search..." />
    <ConversationList>
      <Conversation
        name="Lilly"
        lastSenderName="Lilly"
        info="Yes i can do it for you"
      >
        <Avatar src={image} name="Lilly" status="available" />
      </Conversation>

      <Conversation
        name="Joe"
        lastSenderName="Joe"
        info="Yes i can do it for you"
      >
        <Avatar src={image} name="Joe" status="dnd" />
      </Conversation>
    </ConversationList>
  </Sidebar>
  );
};

export default SidebarComponent;
