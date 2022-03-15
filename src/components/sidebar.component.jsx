import {
  Sidebar,
  Search,
  ConversationList,
  Avatar,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import React from "react";

const SidebarComponent = () => {
  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
        <Conversation
          name="Lilly"
          lastSenderName="Lilly"
          info="Yes i can do it for you"
        >
          <Avatar
            src="https://loremflickr.com/320/240"
            name="Lilly"
            status="available"
          />
        </Conversation>

        <Conversation
          name="Joe"
          lastSenderName="Joe"
          info="Yes i can do it for you"
        >
          <Avatar
            src="https://loremflickr.com/320/240"
            name="Joe"
            status="dnd"
          />
        </Conversation>

        <Conversation
          name="Emily"
          lastSenderName="Emily"
          info="Yes i can do it for you"
          unreadCnt={3}
        >
          <Avatar
            src="https://loremflickr.com/320/240"
            name="Emily"
            status="available"
          />
        </Conversation>

        <Conversation
          name="Kai"
          lastSenderName="Kai"
          info="Yes i can do it for you"
          unreadDot
        >
          <Avatar
            src="https://loremflickr.com/320/240"
            name="Kai"
            status="unavailable"
          />
        </Conversation>
      </ConversationList>
    </Sidebar>
  );
};

export default SidebarComponent;
