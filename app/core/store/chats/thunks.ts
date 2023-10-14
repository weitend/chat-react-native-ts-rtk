import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../lib/supabase";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (userId: string | undefined) => {
    const getAllChats = async () => {
      const { data: chatIds } = await supabase
        .from("chats")
        .select("id, users:chat_users!inner(user_id)")
        .eq("users.user_id", userId);

      return await supabase
        .from("chats")
        .select("*, users:chat_users!inner(user:profiles(email))")
        .in("id", [chatIds?.map((chat) => chat.id)]);
    };
    const { data: allChats } = await getAllChats();

    const { data: createdChats, error } = await supabase
      .from("chats")
      .select("id")
      .eq("creator_id", userId);

    return { allChats: allChats, createdChats: createdChats };
  }
);
