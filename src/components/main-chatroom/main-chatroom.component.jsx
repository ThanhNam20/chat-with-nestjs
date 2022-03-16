import {
  Avatar, ChatContainer, ConversationHeader, InfoButton, Message,
  MessageInput, MessageList, MessageSeparator, TypingIndicator, VideoCallButton, VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from 'react';

const MainChatRoomComponent = () => {
  const [image, setImage] = useState('https://loremflickr.com/320/240');
  const [messageInputValue, setMessageInputValue] = useState("");
  return (
    <ChatContainer>
    <ConversationHeader>
      <ConversationHeader.Back />
      <Avatar src={image} name="Zoe" />
      <ConversationHeader.Content
        userName="Zoe"
        info="Active 10 mins ago"
      />
      <ConversationHeader.Actions>
        <VoiceCallButton />
        <VideoCallButton />
        <InfoButton />
      </ConversationHeader.Actions>
    </ConversationHeader>
    <MessageList
      typingIndicator={<TypingIndicator content="Zoe is typing" />}
    >
      <MessageSeparator content="Saturday, 30 November 2019" />

      <Message
        model={{
          message: "Hello my friend",
          sentTime: "15 mins ago",
          sender: "Patrik",
          direction: "outgoing",
          position: "single",
        }}
        avatarSpacer
      />
      <Message
        model={{
          message: "Hello my friend",
          sentTime: "15 mins ago",
          sender: "Zoe",
          direction: "incoming",
          position: "first",
        }}
        avatarSpacer
      />
      <Message
        model={{
          message: "Hello my friend",
          sentTime: "15 mins ago",
          sender: "Zoe",
          direction: "incoming",
          position: "normal",
        }}
        avatarSpacer
      />
      <Message
        model={{
          message: "Hello my friend",
          sentTime: "15 mins ago",
          sender: "Zoe",
          direction: "incoming",
          position: "normal",
        }}
        avatarSpacer
      />
    </MessageList>
    <MessageInput
      placeholder="Type message here"
      value={messageInputValue}
      onChange={(val) => setMessageInputValue(val)}
      onSend={() => setMessageInputValue("")}
    />
  </ChatContainer>
  )
}

export default MainChatRoomComponent