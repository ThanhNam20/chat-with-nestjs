import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localStorageService } from "../../services/local-storage.service";
import { privateApiService } from "../../services/private-api.service";
import { LOCAL_STORAGE } from "../../share/constant";
import { RoomStateService } from "../../store/roomState";
import { UserStateService } from "../../store/userState";

const NewConversationModalComponent = ({ onOpenModal }) => {
  const listRoomsState = useRecoilValue(RoomStateService.roomState);
  const listUsersState = useRecoilValue(UserStateService.UserState);
  const setRoomState = useSetRecoilState(RoomStateService.roomState);
  const navigate = useNavigate();
  const setSelectedRoomState = useSetRecoilState(RoomStateService.selectedRoomState);
  

  const userInfoLocal = JSON.parse(
    localStorageService.getLocal(LOCAL_STORAGE.USER_INFO)
  );

  const listUserIdHaveConversation = [];
  listRoomsState.forEach((item) => {
    item.list_user_id_in_room.forEach((element) => {
      if (element !== userInfoLocal.user_id) {
        listUserIdHaveConversation.push(element);
      }
    });
  });

  const listUserIdDontHaveConversation = listUsersState.filter(
    (item) =>
      !listUserIdHaveConversation.includes(item.user_id) &&
      item.user_id !== userInfoLocal.user_id
  );
  const onCreateAConversation = (item) => {
    const body = {
      list_user_id_in_room: [userInfoLocal.user_id, item.user_id],
    };
    privateApiService.createConversation(body).then((data) => {
      if (!data) return;
      privateApiService
        .getUserChatRoom(userInfoLocal.user_id)
        .then((user_room) => {
          setRoomState(user_room.data);
          goToConversationDetail(data.data);
        })
        .catch((error) => console.error(error));
    });
  };

  const goToConversationDetail = (item) => {
    localStorageService.setLocal(
      LOCAL_STORAGE.LAST_CONVERSATION_ID,
      item.room_id
    );
    setSelectedRoomState(item.room_id);
    navigate(`/chatroom/${item.room_id}`);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Create Conversation</h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className=" relative p-6 flex-auto">
              {listUserIdDontHaveConversation.map((item, key) => (
                <div
                  onClick={() => onCreateAConversation(item)}
                  type="button"
                  className="  hover:bg-violet-300 flex flex-row justify-start pb-2 pt-2 items-center"
                  key={key}
                >
                  <img
                    className="rounded-full w-9 h-9 "
                    src={item.user_avatar}
                    alt="avatar"
                  />
                  <p className="pl-2">{item.email}</p>
                </div>
              ))}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                onClick={() => onOpenModal(false)}
                className="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NewConversationModalComponent;
