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
        paddingTop: height * 0.06,
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
        backgroundColor: "#fff", 
        borderRadius: 10,
        padding: width * 0.02,
        elevation: 10, 
        shadowColor: "black",

    },

    inputGroup: {
        marginBottom: height * 0.02,
        
    },

    label: { 
        fontSize: 15,
        fontWeight: "600",
        color: "#2b2a2aff",
        marginBottom: height * 0.01,


    },

    inputIcon: {
        flexDirection: "row",
        paddingLeft: width * 0.02,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#363636ff",
        borderRadius: 10,
        
    },

    inputError: {
        flexDirection: "row",
        backgroundColor: "#b60606ff",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#b60606ff",
        borderRadius: 10,
        paddingLeft: width * 0.02,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        fontWeight: "600",
        paddingHorizontal: width * 0.02,

    },
    errorText: {
        color: "red",
        fontSize: 13,
        marginTop: height * 0.01,
        fontWeight: "600",
        marginLeft: height * 0.01,
    }


})