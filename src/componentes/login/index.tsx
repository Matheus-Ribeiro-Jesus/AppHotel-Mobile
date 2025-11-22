import AuthContainer from "@/componentes/ui/AuthContainer";
import TextField from "@/componentes/ui/TextField";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { global } from "../ui/style";
import { useRouter } from "expo-router";

const RenderLogin = () => {
  const router = useRouter();

  const { width, height } = Dimensions.get("window");
  return (
    <AuthContainer
      title="Bem-vindo ao Transilvania"
      subtitle="Por favor insira seus dados"
      contentStyle={{
        marginTop: height * 0.03,
        height: height * 0.50,
      }}
      logo={require("../../../assets/images/profile.png")}
    >
      <TextField
        label="Email"
        icon="email"
        placeholder="user@email.com"
        keyboardType="email-address"
      />

      <PasswordField
        label="Senha"
        icon="lock"
        placeholder="*********"
      />

      <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={[global.primaryButton]}>
        <Text style={global.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: height * 0.04 }}>
        <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "black", width: width * 0.5, height: height * 0.001, borderRadius: 10, marginTop: height * 0.03 }}></View>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={{ color: "black", fontWeight: "600", fontSize: 16, marginTop: height * 0.02 }}>Não possui uma conta? Cadastre-se agora! </Text>
        </TouchableOpacity>

      </View>

    </AuthContainer>
  )
}

export default RenderLogin;