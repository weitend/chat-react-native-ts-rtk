import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;
export const chatsSelector = (state: RootState) => state.chats;
