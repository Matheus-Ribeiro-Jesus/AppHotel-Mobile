import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");


export const global = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: "#ffff"
    },
    keyboardAvoiding: {
        flex: 1,

    },

    container: {
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.04,
        paddingBottom: height * 0.3,
    },

    header: {
        alignItems: "center",
        marginBottom: height * 0.03,
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
    },

    subtitle: {
        fontSize: 17,
        color: "blue",
        marginTop: height * 0.02,

    },

    content: {
        backgroundColor: "#fff", // cor sólida
        borderRadius: 10,
        padding: width * 0.02,
        elevation: 8, // aumenta pra ver efeito
        shadowColor: "black",

    }


})