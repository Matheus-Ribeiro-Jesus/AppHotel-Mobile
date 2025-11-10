import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./style";


type Props = {
    title: string;
    subtitle?: string;
    // keyof = mudando de numeros para textos  
    // typeof dizendo que o tipo dele é fontAwesome
    icon?: keyof typeof FontAwesome6.glyphMap;
    // children: React.ReactNode;
}


export default function AuthContainer({ title, subtitle, icon }: Props){
    return (
        <SafeAreaView style={global.SafeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={global.keyboardAvoiding}>
            <ScrollView contentContainerStyle={global.container}>

                <View style={global.header}>
                {!!icon && <FontAwesome6 name={icon} size={25} color="black" />}
                <Text style={global.title}>{title}</Text>
                {!! subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
                </View>

                <View style={global.content}>
                    {/* {childrean} */}
                </View>

            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}