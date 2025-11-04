import React from "react";
import { Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome6.glyphMap;
    // children: React.ReactNode;
}


export default function AuthContainer({title, subtitle, icon }: Props){
    return (
        <SafeAreaView>
            <FontAwesome6 name={icon} size={25} color="black" />
            <Text>{title}</Text>
            <Text>{subtitle}</Text>
        </SafeAreaView>
    );

}