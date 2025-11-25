import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, ImageBackground, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./style";

type Props = {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    headerLeft?: React.ReactNode;

    containerStyle?: any;
    headerStyle?: any;
    subtitleStyle?: any;
    logo?: any;
    logoStyle?: any;

};

const AuthContainer = ({ title, subtitle, children, headerLeft, containerStyle, logo, logoStyle }: Props) => {
    return (
        <SafeAreaView style={global.SafeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={global.keyboardAvoiding}
            >
                <ScrollView contentContainerStyle={[global.container, containerStyle]}>

                    {headerLeft && (
                        <View style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
                            {headerLeft}
                        </View>
                    )}

                    <View style={global.header}>
                        {!!logo && (
                            <Image 
                                source={logo}
                                style={[global.logo, logoStyle]}
                                resizeMode="cover"
                            />
                        )}

                        {!!title && <Text style={global.title}>{title}</Text>} 
                        {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}

                    </View>

                    <View>
                        {children}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default AuthContainer;
