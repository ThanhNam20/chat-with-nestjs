import {
  AddUserButton,
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localStorageService } from "../../services/local-storage.service";
import { LOCAL_STORAGE } from "../../share/constant";
import { RoomStateService } from "../../store/roomState";
import NewConversationModalComponent from "../new-conversation-modal/new-conversation-modal.component";

const SidebarComponent = (props) => {
  const { listRoom, userId } = props;
  const navigate = useNavigate();
  const [listRoomUser, setListRoomUser] = useState([]);
  const [listRoomUserBackUp, setListRoomUserBackup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const setSelectedRoomState = useSetRecoilState(
    RoomStateService.selectedRoomState
  );

  const selectedRoomState = useRecoilValue(RoomStateService.selectedRoomState);

  useEffect(() => {
    let listRoomUserData = listRoom.map((item) => {
      const friend_data = item.list_user_in_room.find(
        (data) => data.user_id !== userId
      );
      return {
        ...item,
        friend_data,
      };
    });
    setListRoomUser(listRoomUserData);
    setListRoomUserBackup(listRoomUserData);
  }, []);

  const goToConversationDetail = (item) => {
    localStorageService.setLocal(
      LOCAL_STORAGE.LAST_CONVERSATION_ID,
      item.room_id
    );
    setSelectedRoomState(item.room_id);
    navigate(`/chatroom/${item.room_id}`);
  };

  const onOpenModal = (state) => {
    setShowModal(state);
  };

  const onSearchingChatRoom = (queryString) => {
    if (queryString === "") {
      setListRoomUser(listRoomUserBackUp);
    }
    const listUserRoomFilter = listRoomUserBackUp.filter((item) =>
      item.friend_data.email.includes(queryString)
    );
    setListRoomUser(listUserRoomFilter);
  };

  const onLogout = () => {
    localStorageService.clearLocal();
    navigate("/login");
  };

  return (
    <Sidebar position="left" scrollable={false}>
      <div className="flex flex-row">
        <Search
          onClearClick={() => {
            setListRoomUser(listRoomUserBackUp);
          }}
          onChange={onSearchingChatRoom}
          placeholder="Search..."
        />
        <AddUserButton onClick={() => onOpenModal(true)} />
      </div>

      <ConversationList>
        {listRoomUser.length !== 0 ? (
          listRoomUser.map((item, key) =>
            selectedRoomState === item.room_id ? (
              <div className="bg-sky-200" onClick={() => goToConversationDetail(item)}>
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
            ) : (
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
            )
          )
        ) : (
          <div>
            <p className="text-center">Not found data</p>
          </div>
        )}
      </ConversationList>
      <div className="text-center mb-2">
        <button
          onClick={onLogout}
          class="w-3/4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {showModal ? (
        <NewConversationModalComponent onOpenModal={onOpenModal} />
      ) : null}
    </Sidebar>
  );
};

export default SidebarComponent;
