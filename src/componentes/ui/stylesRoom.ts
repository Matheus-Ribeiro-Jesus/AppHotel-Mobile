import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const stylesRoom = StyleSheet.create({
container: {
  width: width * 0.65,
  backgroundColor: "#fff",
  marginRight: 16,
  height: height * 0.35,
  elevation: 5,
  shadowColor: "#000",
  shadowOpacity: 15,
  shadowRadius: 20,
  borderRadius: 12,
  overflow: "hidden",  
},

principal: {
  height: height * 0.36,
},

  imagem: {
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

  text:{
    color: "white",
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

  botaoFechar: {
    marginTop: width * 0.04,
    left: 135,
    backgroundColor: "black",
    padding: 7,
    width: width * 0.28,
    alignItems: "center",
    borderRadius: 10,   

  },

  priceValue: {
  fontWeight: "bold",
  color: "blue",
  fontSize: 16,
},

});
