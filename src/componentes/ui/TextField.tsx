import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { global } from "@/componentes/ui/style";

type Props = TextInputProps & {
    label: string,
    errorText?: string,
    icon?: keyof typeof MaterialIcons.glyphMap;
}

const TextField = ({ label, errorText, icon, style, ...restInputProps } : Props) =>{
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[ global.inputIcon, errorText ? global.inputError : null ]}>
                {!! icon && (
                    <View>
                        <MaterialIcons name={icon} size={23} color="#363636ff" />
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#979797ff"
                    style={[global.input, style]}
                    {...restInputProps}
                />
            </View>
            {!! errorText &&
                <Text style={global.errorText}>{errorText}</Text>
            }
        </View>
    )
    
};

export default TextField;