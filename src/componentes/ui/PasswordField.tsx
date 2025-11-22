import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TextField from "./TextField";
import { Ionicons } from "@expo/vector-icons";
import { global } from "./style";

type Props = React.ComponentProps<typeof TextField>

const PasswordField = (props: Props) => {
    const [show, setShow] = useState(false);
    return (
        <View>
            <TextField
            {...props}
            icon={props.icon ?? "lock"}
            secureTextEntry={!show}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <TouchableOpacity style={global.eyeIcon} onPress={() => setShow((showTrue) => !showTrue)}>
                <Ionicons name={show ? "eye-outline" : "eye-off-outline"} size={23} color="#0f0f0fff"/>
            </TouchableOpacity>

        </View>
    );
};
export default PasswordField;