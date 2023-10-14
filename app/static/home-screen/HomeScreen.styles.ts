import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  container: { gap: 10 },
  send: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
  list: {
    height: "85%",
  },
});
