import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./style";
import { BlurView } from 'expo-blur';

type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome6.glyphMap;
    children: React.ReactNode;
}

const AuthContainer = ({ title, subtitle, icon, children }: Props) => {
    return (
        <ImageBackground
            source={require("../../../assets/images/pexels.webp")}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView style={global.SafeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={global.keyboardAvoiding}
                >
                    <ScrollView contentContainerStyle={global.container}>
                        
                        <View style={global.header}>
                            {!!icon && <FontAwesome6 name={icon} size={25} color="white" />}
                            <Text style={global.title}>{title}</Text>
                            {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
                        </View>

                        <BlurView intensity={31} tint="dark" style={global.content}>
                            {children}
                        </BlurView>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default AuthContainer;
