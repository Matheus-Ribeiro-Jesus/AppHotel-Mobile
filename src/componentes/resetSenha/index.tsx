import { resetPass } from "@/componentes/resetSenha/style";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";

const RenderResetPassword = () => {
    const router = useRouter();

    return (
        <AuthContainer
            title="Redefinição de Senha"
            subtitle="Digite seu email para redefinir sua senha"
            headerLeft={
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>}>

            <TextField
                label="Seu Email"
                placeholder="user@email.com"
                keyboardType="email-address"
            />

            <View>
                <TouchableOpacity>
                    <Text style={resetPass.text}>Enviar E-mail</Text>
                </TouchableOpacity>
            </View>

        </AuthContainer>
    )
}
export default RenderResetPassword;