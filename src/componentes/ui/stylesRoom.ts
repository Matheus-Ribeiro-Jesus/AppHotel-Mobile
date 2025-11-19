import { Image, StyleSheet, Dimensions} from "react-native";
const { width, height } = Dimensions.get("window");

export const stylesRoom = StyleSheet.create({
  container: {
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 4, 
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: "100%",
    height: width * 0.40,
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
