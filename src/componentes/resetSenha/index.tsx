import { resetPass } from "@/componentes/resetSenha/style";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/style";

const RenderResetPassword = () => {
  const router = useRouter();
  return (
    <AuthContainer
      title="Esqueceu sua senha?"
      logo={require("../../../assets/images/forgotPassword.png")}
      logoStyle={{ borderRadius: 30 }}

      subtitle="Digite seu email para redefinir sua senha"
      headerLeft={
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      }
    >
      <View style={[global.content, resetPass.content]}>
        <TextField
          label="Digite o seu E-mail cadastrado"
          placeholder="user@email.com"
          keyboardType="email-address"
        />

        <View>
          <TouchableOpacity>
            <Text style={resetPass.text}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};
export default RenderResetPassword;
