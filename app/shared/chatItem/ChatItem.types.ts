import { chat_with_users_email } from "../../types/chat_with_users_email";

export interface ChatItemInterface {
  chat: chat_with_users_email;
  onPress: () => void;
}
