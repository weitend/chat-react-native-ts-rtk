import { StyleSheet } from "react-native";

export const chatScreenStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    padding: 7,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    height: 40,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  flexDC: {
    flexDirection: "column",
  },
});
