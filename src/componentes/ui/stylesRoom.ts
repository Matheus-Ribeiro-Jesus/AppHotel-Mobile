import { Image, StyleSheet, Dimensions} from "react-native";
const { width, height } = Dimensions.get("window");

export const stylesRoom = StyleSheet.create({
container: {
    width: width * 0.50,               
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,           
    elevation: 4,
    height: height * 0.32,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: "100%",
    height: 140,               
  },

  infoSection: {
    padding: 12,
    gap: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  price: {
    fontSize: 14,
    color: "#555",
  },
});
