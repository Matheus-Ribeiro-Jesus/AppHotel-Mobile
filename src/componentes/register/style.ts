import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const register = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: "#000000ff",
        borderRadius: 10,
        alignItems: "center",
        padding: width * 0.029,
    },

    textContent: {
        color: "white",
    },

    container: {
        paddingTop: height * 0.03,
        paddingBottom: 0,
    },

    inputs: {
        height: height * 0.99,
    }


})