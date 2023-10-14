export const SUPABASE = {
  IDS: {
    ID: "id",
    USER_ID: "user_id",
    CHAT_ID: "chat_id",
  },
  ALL: "*",
  TABLES: {
    CHATS: "chats",
    CHAT_USERS: "chat_users",
    MESSAGES: "messages",
    PROFILES: "profiles",
  },
  CHANNEL: {
    CUSTOM_ALL_CHANNEL: "custom-all-channel",
  },
};

export const NAVIGATION = {
  NAVIGATE: {
    AUTH: "auth",
    CHAT: "chat",
    CHATS: "chats",
    SEARCH: "search",
  },
  TITLE: {
    AUTH: "Авторизация",
    CHATS: "Чаты",
    CHAT: "Чат",
    SEARCH: "Поиск",
  },
};

export const BUTTON = {
  TITLE: {
    LEAVE: "Выйти",
    SIGN_IN: "Войти",
    SIGN_OUT: "Выйти",
    DELETE_CHAT: "Удалить чат",
    SEND: "Отправить",
    FIND_CHAT: "Найти чат",
  },
  COLOR: {
    RED: "#ff0000",
  },
};

export const INPUT = {
  PLACEHOLDER: {
    FIND_CHAT: "Найти чат",
    EMAIL: "email@address.com",
    PASSWORD: "Password",
    MESSAGE: "Сообщение",
    CREATE_CHAT: "Создать чат",
  },
  LABEL: {
    EMAIL: "Email",
    PASSWORRD: "Password",
  },
  ICON: {
    LEFT: {
      TYPE: {
        FONT_AWESOME: "font-awesome",
      },
      NAME: {
        ENVELOPE: "envelope",
        LOCK: "lock",
      },
    },
  },
};
