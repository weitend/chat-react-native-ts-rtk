import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../lib/supabase";

export const authEmail = createAsyncThunk(
  "user/authEmail",
  async ([email, password]: string[]) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return { data: data, error: error };
  }
);

export const getSession = createAsyncThunk("user/getSection", async () => {
  let data;

  await supabase.auth.getSession().then(({ data: { session } }) => {
    data = session;
    return session;
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    data = session;
  });
  return data;
});

export const signOut = createAsyncThunk("user/signOut", async () => {
  supabase.auth.signOut();
});
