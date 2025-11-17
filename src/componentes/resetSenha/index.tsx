import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { resetPass } from "@/componentes/resetSenha/style"
import { useRouter } from "expo-router";

const RenderResetPassword = () => {
    return(
        <AuthContainer 
        title="Redefinição de Senha"
        subtitle="Digite seu email para receber redefinir sua senha"
        >
        </AuthContainer>
    )
}
export default RenderResetPassword;