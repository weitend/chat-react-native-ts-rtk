import {
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import ChatItem from "../chatItem/ChatItem";
import { userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import { INPUT, NAVIGATION, SUPABASE } from "../../core/constants";
import { autocompleteStyles } from "./Autocomplete.styles";

export default function AutocompleteScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [text, setText] = useState<string>();
  const [data, setData] = useState<any[] | null>();

  const userState = useSelector(userSelector);

  const handleChangeText = async (value: string) => {
    setText(value);

    const { data: chatIds } = await supabase
      .from(SUPABASE.TABLES.CHATS)
      .select(SUPABASE.ALL)
      .eq(SUPABASE.IDS.ID, value);

    setData(chatIds);
  };

  const handlePress = async (id: string) => {
    const { data } = await supabase
      .from(SUPABASE.TABLES.CHAT_USERS)
      .select()
      .eq(SUPABASE.IDS.USER_ID, userState.id)
      .eq(SUPABASE.IDS.CHAT_ID, id);

    if (!data?.length) {
      await supabase.from(SUPABASE.TABLES.CHAT_USERS).insert([
        {
          chat_id: id,
          user_id: userState.id,
        },
      ]);
    }

    navigation.navigate(NAVIGATION.NAVIGATE.CHAT, {
      id: id,
      userId: userState.id,
    });
  };

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={autocompleteStyles.container}>
        <TextInput
          placeholder={INPUT.PLACEHOLDER.FIND_CHAT}
          value={text}
          style={autocompleteStyles.input}
          onChangeText={handleChangeText}
        ></TextInput>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ChatItem chat={item} onPress={() => handlePress(item.id)} />
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
