import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const stylesRoom = StyleSheet.create({
container: {
    width: width * 0.50,               
    backgroundColor: "#fff",
    overflow: "hidden",
    marginRight: 16,           
    elevation: 7,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: height * 0.35,
    shadowColor: "#000000ff",
    shadowOpacity: 0.20,
    shadowRadius: 6,
    borderRadius: 12,
  },

  image: {
    width: "100%",
    height: 140,               
  },

  descricao: {
    fontSize: 14,
    left: 10,
  },

  infoSection: {
    padding: 10,
    gap: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  price: {
    fontSize: 17,
    fontWeight: "500",
    color: "#050505ff",
  },
});
