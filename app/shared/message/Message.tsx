import { View, Text } from "react-native";
import { userSelector } from "../../core/store/selectors";
import { useSelector } from "react-redux";
import { MessageInterface } from "./Message.types";
import { messageStyles } from "./Message.styles";

export default function Message({ name, text }: MessageInterface) {
  const userState = useSelector(userSelector);
  return (
    <View
      style={
        name === userState.id
          ? messageStyles.senderMessage
          : messageStyles.recipientMessage
      }
    >
      <Text style={messageStyles.name}>{name}</Text>
      <Text style={messageStyles.text}>{text}</Text>
    </View>
  );
}
