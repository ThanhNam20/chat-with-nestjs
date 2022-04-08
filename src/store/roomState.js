import { atom } from "recoil";

const roomState = atom({
  key: 'roomState',
  default: [],
})

const selectedRoomState = atom({
  key: 'selectedRoomState',
  default: ''
})



export const RoomStateService = {roomState, selectedRoomState}