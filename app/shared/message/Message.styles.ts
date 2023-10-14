import { StyleSheet } from "react-native";

export const messageStyles = StyleSheet.create({
  recipientMessage: {
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    maxWidth: "80%",
    alignSelf: "flex-start",
    padding: 6,
  },
  senderMessage: {
    alignSelf: "flex-end",
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    maxWidth: "80%",
    padding: 15,
    display: "flex",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 11,
    fontWeight: "500",
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.5)",
  },
});
