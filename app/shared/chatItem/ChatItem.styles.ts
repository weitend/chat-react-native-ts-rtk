import { StyleSheet } from "react-native";

export const chatItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 10,
  },
  image: {
    width: 50,
    height: "100%",
    borderRadius: 50,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 50,
    flex: 1,
    gap: 3,
  },
  miniDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.4)",
  },
});
