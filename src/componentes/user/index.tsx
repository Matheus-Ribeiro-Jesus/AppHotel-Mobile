import { Text, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import React from "react";

const RenderAccount = () => {
  return (
    <AuthContainer>
        {/*children */}
            <View>
                <Text>Esta será a futura tela Minha Conta</Text>
            </View>
    </AuthContainer>
  );
};
export default RenderAccount;