import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";
import { localStorageService } from "../../services/local-storage.service";
import { LOCAL_STORAGE } from "../../share/constant";

const MainChatRoomComponent = (props) => {
  const { sendMessage, listMessages } = props;
  const [image, setImage] = useState("https://loremflickr.com/320/240");
  const [messageInputValue, setMessageInputValue] = useState("");
  const userInfo = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );

  const onSendMessage = () => {
    sendMessage(messageInputValue);
    setMessageInputValue("");
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={image} name="Zoe" />
        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
      // typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        <MessageSeparator content="Saturday, 30 November 2019" />
        {listMessages && listMessages.length !== 0
          ? listMessages.map((item, index) =>
              item.user_id === userInfo.user_id ? (
                <Message
                  model={{
                    message: item.content,
                    sentTime: "15 mins ago",
                    sender: "Patrik",
                    direction: "outgoing",
                    position: "single",
                  }}
                  avatarSpacer
                  key={index}
                />
              ) : (
                <Message
                  model={{
                    message: item.content,
                    sentTime: "15 mins ago",
                    sender: "Patrik",
                    direction: "incoming",
                    position: "single",
                  }}
                  avatarSpacer
                  key={index}
                />
              )
            )
          : null}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue}
        onChange={(val) => setMessageInputValue(val)}
        onSend={() => onSendMessage()}
      />
    </ChatContainer>
  );
};

export default MainChatRoomComponent;
