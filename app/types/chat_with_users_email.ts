import { chats } from "./chats";

export type chat_with_users_email = chats & {
  users:
    | {
        user: { email: string }[] | { email: string };
      }[]
    | {
        user: { email: string }[] | { email: string };
      };
};
