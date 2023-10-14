import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../types/user";
import { authEmail, getSession, signOut } from "./thunk";

const initialUserState: UserInterface = {
  session: {},
  id: "",
  email: "",
  error: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authEmail.fulfilled, (state, action) => {
      state.error = action.payload.error?.message;
      state.session = action.payload.data.session;
      state.email = action.payload.data.session?.user.email;
      state.id = action.payload.data.user?.id;
      state.isAuth = true;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.session = {};
      state.email = "";
      state.id = "";
      state.isAuth = false;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
