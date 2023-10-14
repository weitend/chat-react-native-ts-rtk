import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import Message from "../../shared/message/Message";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import { chatsSelector, userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../core/store/store";
import { fetchChats } from "../../core/store/chats/thunks";
import { getAllMessages } from "./ChatScreen.service";
import { chatScreenStyles } from "./ChatScreen.styles";
import { BUTTON, INPUT, NAVIGATION, SUPABASE } from "../../core/constants";

export default function ChatScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { id, userId } = route.params;
  const [allMessagesData, setAllMessagesData] = useState<any[] | null>([]);
  const [newMessage, setNewMessage] = useState<string>();

  const chatsState = useSelector(chatsSelector);
  const userState = useSelector(userSelector);
  const dispatch = useAppDispatch();

  let messagesWatcher: any;

  useEffect(() => {
    async function fetchData() {
      const { data: allMessages } = await getAllMessages(id);
      setAllMessagesData(allMessages);

      messagesWatcher = supabase
        .channel(SUPABASE.CHANNEL.CUSTOM_ALL_CHANNEL)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          async () => {
            const { data: allMessages } = await getAllMessages(id);
            setAllMessagesData(allMessages);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "messages",
          },
          async () => {
            dispatch(fetchChats(userState.id));
            navigation.navigate(NAVIGATION.NAVIGATE.CHATS);
          }
        )
        .subscribe();
    }
    fetchData();

    return () => messagesWatcher?.unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    await supabase.from(SUPABASE.TABLES.MESSAGES).insert([
      {
        chat_id: parseInt(id),
        author_id: userId,
        content: newMessage,
      },
    ]);
    setNewMessage("");
  };

  const handleDelete = async () => {
    await supabase.from(SUPABASE.TABLES.CHATS).delete().eq(SUPABASE.IDS.ID, id);
    dispatch(fetchChats(userState.id));
    navigation.navigate(NAVIGATION.NAVIGATE.CHATS);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -190}
      style={{ flex: 1 }}
    >
      <View style={chatScreenStyles.container}>
        {chatsState.createdChats?.filter((el) => el.id === id).length === 1 && (
          <Button
            title={BUTTON.TITLE.DELETE_CHAT}
            color={BUTTON.COLOR.RED}
            onPress={handleDelete}
          />
        )}
        <FlatList
          style={chatScreenStyles.flexDC}
          data={allMessagesData}
          renderItem={({ item }) => (
            <Message key={item.id} name={item.author_id} text={item.content} />
          )}
        />
        <TextInput
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
          style={chatScreenStyles.input}
          placeholder={INPUT.PLACEHOLDER.MESSAGE}
        />
        <Button
          title={BUTTON.TITLE.SEND}
          onPress={handleSendMessage}
          disabled={!newMessage?.length}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
