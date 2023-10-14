import { StyleSheet, View, Button, FlatList, TextInput } from "react-native";
import { useEffect, useState } from "react";
import ChatItem from "../../shared/chatItem/ChatItem";
import { supabase } from "../../../lib/supabase";
import { chatsSelector, userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../core/store/store";
import { getSession } from "../../core/store/user/thunk";
import { fetchChats } from "../../core/store/chats/thunks";
import { BUTTON, INPUT, NAVIGATION } from "../../core/constants";
import { homeScreenStyles } from "./HomeScreen.styles";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [newUserEmail, setNewUserEmail] = useState<string>();

  const userState = useSelector(userSelector);
  const chatsState = useSelector(chatsSelector);
  const dispatch = useAppDispatch();

  let chatsWatcher: any;

  useEffect(() => {
    dispatch(getSession());
    dispatch(fetchChats(userState.id));

    async function fetchData() {
      chatsWatcher = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "chats" },
          () => {
            dispatch(fetchChats(userState.id));
          }
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_users" },
          () => {
            dispatch(fetchChats(userState.id));
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "chat_users" },
          () => {
            dispatch(fetchChats(userState.id));
          }
        )
        .subscribe();
    }

    fetchData();

    return () => chatsWatcher?.unsubscribe();
  }, []);

  async function createChatWithUser() {
    const { data: otherUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", newUserEmail)
      .single();

    if (otherUser) {
      console.log(otherUser);
      const { data: chat } = await supabase
        .from("chats")
        .insert({ creator_id: userState.id })
        .select()
        .single();

      const { data, error } = await supabase.from("chat_users").insert([
        {
          chat_id: chat.id,
          user_id: userState.id,
        },
        {
          chat_id: chat.id,
          user_id: otherUser.id,
        },
      ]);
      dispatch(fetchChats(userState.id));
      setNewUserEmail("");
    }
  }

  const handleTouch = (item: { id: string; users: { email: string }[] }) => {
    navigation.navigate(NAVIGATION.NAVIGATE.CHAT, {
      id: item.id,
      userId: userState.id,
      users: item.users,
    });
  };

  return (
    <View style={homeScreenStyles.container}>
      <Button
        title={BUTTON.TITLE.FIND_CHAT}
        onPress={() => navigation.navigate(NAVIGATION.NAVIGATE.SEARCH)}
      />
      <View style={homeScreenStyles.send}>
        <TextInput
          style={homeScreenStyles.input}
          placeholder={INPUT.PLACEHOLDER.EMAIL}
          value={newUserEmail}
          onChangeText={(text) => setNewUserEmail(text)}
          autoCapitalize="none"
        />
        <Button
          onPress={createChatWithUser}
          title={INPUT.PLACEHOLDER.CREATE_CHAT}
        />
      </View>
      <View>
        <FlatList
          style={homeScreenStyles.list}
          data={chatsState.allChats}
          renderItem={({ item }) => (
            <ChatItem chat={item} onPress={() => handleTouch(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
