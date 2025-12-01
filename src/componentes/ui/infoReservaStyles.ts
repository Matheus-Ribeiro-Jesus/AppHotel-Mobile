import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const infoReservar = StyleSheet.create({
  image: {
    marginTop: 1,
    marginLeft: 7,
    borderRadius: 6,
    width: "22%",
    height: 70,
  },

  content: {
    display: "flex",
    flexDirection: "row",
    width: width * 0.6,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginLeft: 35,
    elevation: 4,
    height: height * 0.12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
