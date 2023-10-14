import { ChatsInterface } from "../types/chats";
import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./thunks";

const initialChatsState: ChatsInterface = {
  allChats: [],
  createdChats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.allChats = action.payload.allChats;
      state.createdChats = action.payload.createdChats;
    });
  },
});

export default chatsSlice.reducer;
