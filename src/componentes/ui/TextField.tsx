import { FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { global } from "@/componentes/ui/style";
import React from "react";

type NameIcon =
  | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
  | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap }
  | { lib: "Ionicons"; name: keyof typeof Ionicons.glyphMap }
  | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap };

type Props = TextInputProps & {
  label: string;
  errorText?: string;
  icon?: NameIcon;
};

const TextField = ({
  label,
  errorText,
  icon,
  style,
  ...restInputProps
}: Props) => {
  
  return (
    <View style={global.inputGroup}>
      <Text style={global.label}>{label}</Text>
      <View style={[global.inputIcon, errorText ? global.inputError : null]}>
        {!!icon && (
          <View>
            {icon.lib === "MaterialIcons" && (
              <MaterialIcons name={icon.name} size={23} color="black" />
            )}

            {icon.lib === "FontAwesome5" && (
              <FontAwesome5 name={icon.name} size={20} color="black" />
            )}

            {icon.lib === "FontAwesome6" && (
              <FontAwesome6 name={icon.name} size={20} color="black" />
            )}
          </View>
        )}
        <TextInput
          keyboardAppearance="dark"
          placeholderTextColor="#0f0f0fff"
          style={[global.input, style]}
          {...restInputProps}
        />
      </View>
      {!!errorText && <Text style={global.errorText}>{errorText}</Text>}
    </View>
  );
};

export default TextField;
