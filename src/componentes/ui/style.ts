import { StyleSheet, Dimensions } from "react-native";
const {width, height } = Dimensions.get("window");


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
        paddingTop: 25,
        paddingBottom: 32,
    },

    header: {
        alignItems: "center",
        marginBottom: 16,
        padding: 14,
    },

    content: {
        backgroundColor: "blue",
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
    },

    subtitle: {
        fontSize: 17,
        color: "purple",
        marginTop: 6,

    }


})