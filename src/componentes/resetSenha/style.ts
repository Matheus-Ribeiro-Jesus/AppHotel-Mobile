import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export const resetPass = StyleSheet.create({
    text: {
        color: "white",
        backgroundColor: "#000000ff",
        borderRadius: 10,
        alignItems: "center",
        padding: width * 0.030,
        textAlign: "center",
        fontWeight:  "600",
    }
})