import { atom } from "recoil";

const UserState = atom({
  key: 'userState',
  default: [],
})



export const UserStateService = {UserState}