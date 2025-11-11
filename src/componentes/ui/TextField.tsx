import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
    label: string,
    errorText?: string,
    icon?: keyof typeof MaterialIcons.glyphMap;
}

export function TextField( { label, errorText, icon } : Props ) {
    return (
        <View>
            <Text>{label}</Text>
            <View>
                {!! icon && (
                    <View>
                        <MaterialIcons name={icon} size={18} color="black" />
                    </View>
                )}
                <TextInput
                    value="isso é um teste"
                />
            </View>
        </View>
    )
}