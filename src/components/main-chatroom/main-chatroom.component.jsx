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
import React, { useState, useRef } from "react";
import { SiIconify } from "react-icons/si";
import { localStorageService } from "../../services/local-storage.service";
import { LOCAL_STORAGE, MESSAGE_TYPE } from "../../share/constant";

import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

import "./index.css";
const MainChatRoomComponent = (props) => {
  const [isOpenEmojiModal, setisOpenEmojiModal] = useState(false);
  const { sendMessage, listMessages, room_id } = props;
  const [image, setImage] = useState("https://loremflickr.com/320/240");
  const [selectedImageB64, setSelectedImageB64] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFileName, setSelectedImageFileName] = useState(null);
  const [messageInputValue, setMessageInputValue] = useState("");
  const userInfo = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );
  const onEmojiClick = (event, emojiObject) => {
    setMessageInputValue(
      (oldMessageValue) => `${oldMessageValue} ${emojiObject.emoji}`
    );
  };

  const onOpenEmojiModal = () => {
    setisOpenEmojiModal(!isOpenEmojiModal);
  };

  const onSendMessage = () => {
    if (selectedImageB64) {
      const messageInfo = {
        imageFile: selectedImage,
        imageFileName: selectedImageFileName,
        messageInputValue,
        user_id: userInfo.user_id,
        message_type: MESSAGE_TYPE.IMAGE,
      };
      sendMessage(messageInfo);
      setMessageInputValue("");
      setSelectedImageB64(null);
      setSelectedImage(null);
      setSelectedImageFileName(null);
      return;
    }
    const messageInfo = {
      messageInputValue,
      user_id: userInfo.user_id,
      message_type: MESSAGE_TYPE.TEXT,
    };
    sendMessage(messageInfo);
    setMessageInputValue("");
  };

  const selectImage = (item) => {
    if (!item) return;
    if (item.size > 5242880 / 5) {
      toast.error("Upload image file smaller then 1Mb");
      return;
    }
    setSelectedImage(item);
    setSelectedImageFileName(item.name);
    setMessageInputValue(item.name);
    const reader = new FileReader();
    reader.onloadend = function () {
      setSelectedImageB64(reader.result);
    };
    reader.readAsDataURL(item);
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
                item.user_id === userInfo.user_id && item.message_type === 0 ? (
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
                ) : item.user_id === userInfo.user_id &&
                  item.message_type === 1 ? (
                  <Message
                    model={{
                      message: item.content,
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "single",
                    }}
                  >
                    <Message.ImageContent
                      src={item.image_url}
                      alt="Akane avatar"
                      width={100}
                    />
                  </Message>
                ) : item.user_id !== userInfo.user_id &&
                  item.message_type !== 0 ? (
                  <Message
                    model={{
                      direction: "incoming",
                    }}
                  >
                    <Message.ImageContent
                      src={item.image_url}
                      alt="Akane avatar"
                      width={100}
                    />
                  </Message>
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
          <div>
            <label htmlFor="upload">
              <FiImage className="relative z-50 left-1 top-4 text-cyan-400 ml-2" />
            </label>
            <input
              hidden
              id="upload"
              onChange={(event) => selectImage(event.target.files[0])}
              type="file"
            />
          </div>

          {selectedImageB64 ? (
            <img
              className="w-20 h-20 relative bottom-24 right-1*4 "
              src={selectedImageB64}
              alt=""
            />
          ) : null}

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
