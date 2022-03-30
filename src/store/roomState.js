import { atom } from "recoil";

const roomState = atom({
  key: 'roomState',
  default: [],
})



export const RoomStateService = {roomState}