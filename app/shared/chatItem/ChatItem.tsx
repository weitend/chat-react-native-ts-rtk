import { Text, Pressable, View } from "react-native";
import { chatItemStyles } from "./ChatItem.styles";
import { ChatItemInterface } from "./ChatItem.types";

export default function ChatItem({ chat, onPress }: ChatItemInterface) {
  return (
    <Pressable onPress={onPress} style={chatItemStyles.wrapper}>
      <View style={chatItemStyles.container}>
        <View style={chatItemStyles.details}>
          <Text style={chatItemStyles.text}>chat id: {chat.id}</Text>
        </View>
      </View>
    </Pressable>
  );
}
