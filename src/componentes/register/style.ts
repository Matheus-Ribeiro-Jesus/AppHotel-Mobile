import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const register = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: "#000000ff",
        borderRadius: 10,
        alignItems: "center",
        padding: width * 0.025,
    },

    textContent: {
        color: "white",
    }
})