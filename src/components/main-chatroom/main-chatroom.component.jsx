import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import Picker from "emoji-picker-react";
import React, { useState } from "react";
import { SiIconify } from "react-icons/si";
import { localStorageService } from "../../services/local-storage.service";
import { LOCAL_STORAGE, MESSAGE_TYPE } from "../../share/constant";

const MainChatRoomComponent = (props) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isOpenEmojiModal, setisOpenEmojiModal] = useState(false);
  const { sendMessage, listMessages } = props;
  const [image, setImage] = useState("https://loremflickr.com/320/240");
  const [messageInputValue, setMessageInputValue] = useState("");
  const userInfo = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );

  const onEmojiClick = (event, emojiObject) => {
    setMessageInputValue(
      (oldMessageValue) => `${oldMessageValue} ${emojiObject.emoji}`
    );
    setChosenEmoji(emojiObject);
  };

  const onOpenEmojiModal = () => {
    setisOpenEmojiModal(!isOpenEmojiModal);
  };

  const onSendMessage = () => {
    const messageInfo = {
      messageInputValue,
      user_id: userInfo.user_id,
      message_type: MESSAGE_TYPE.TEXT,
    };
    sendMessage(messageInfo);
    setMessageInputValue("");
  };

  return (
    <>
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
        <div
          as={MessageInput}
          style={{
            display: "flex",
            flexDirection: "row",
            borderTop: "1px dashed #d1dbe4",
          }}
        >
          <SiIconify
            className="relative z-50 left-1 top-4 text-cyan-400"
            onClick={onOpenEmojiModal}
          />
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => onSendMessage()}
            style={{
              flexGrow: 1,
              borderTop: 0,
              flexShrink: "initial",
            }}
          />
        </div>
      </ChatContainer>
      <div className="z-40 absolute top-144 left-80">
        {isOpenEmojiModal ? (
          <Picker
            preload={false}
            disableSearchBar={true}
            onEmojiClick={onEmojiClick}
          />
        ) : null}
      </div>
    </>
  );
};

export default MainChatRoomComponent;
