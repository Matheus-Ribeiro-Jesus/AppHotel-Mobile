import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const global = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: "#0c0c1b",
    },
    keyboardAvoiding: {
        flex: 1,
    },

    container: {
        paddingTop: height * 0.06,
    },

    header: {
        alignItems: "center",
        marginBottom: height * 0.03,
    },

    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "800",
        marginTop: height * 0.05,
    },

    subtitle: {
        fontSize: 17,
        color: "white",
        marginTop: height * 0.02,
    },

    content: {
        flex: 1,
        marginTop: height * 0.08,
        backgroundColor: "#ffffffff",
        padding: width * 0.05,
        shadowColor: "black",
        overflow: "hidden",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowOpacity: 20,
        height: height * 0.58,
    },

    inputGroup: {
        color: "#fff",
        marginBottom: height * 0.03,


    },

    label: {
        marginTop: 3,
        fontSize: 15,
        fontWeight: "600",
        color: "#020202ff",
        marginBottom: height * 0.01,
    },

    inputIcon: {
        flexDirection: "row",
        paddingLeft: width * 0.02,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#00000076",
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
        color: "#eae8e8ff",
        fontWeight: "600",
        paddingHorizontal: width * 0.02,

    },

    eyeIcon: {
        position: "absolute",
        right: 12,
        top: 39,

    },

    errorText: {
        color: "red",
        fontSize: 13,
        marginTop: height * 0.01,
        fontWeight: "600",
        marginLeft: height * 0.01,
    },

    primaryButton: {
        backgroundColor: "#000000ff",
        borderRadius: 10,
        alignItems: "center",
        padding: width * 0.025,
    },

    primaryButtonDisabled: {
        backgroundColor: "#080808ff",
        borderRadius: 10,
    },

    primaryButtonText: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "600"
    },

    logo: {
        width: width * 0.30,
        height: width * 0.30,
        borderRadius: 60, 
        overflow: "hidden",
    },



})