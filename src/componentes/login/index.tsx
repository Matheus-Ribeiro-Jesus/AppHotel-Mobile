import AuthContainer from "@/componentes/ui/AuthContainer";
import TextField from "@/componentes/ui/TextField";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { global } from "../ui/style";
import { login } from "@/componentes/login/login"
import { useRouter } from "expo-router";

const RenderLogin = () => {
  const router = useRouter();

  const { width, height } = Dimensions.get("window");
  return (
    <AuthContainer
      title="Bem-vindo ao Transilvania"
      subtitle="Por favor insira seus dados"
      logo={require("../../../assets/images/profile.png")}
    >
      
      <View style={[global.content, login.texts]}>
        <TextField
          label="E-mail"
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="user@email.com"
          keyboardType="email-address"
        />

        <PasswordField
          label="Senha"
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="*********"
        />
        <TouchableOpacity
          style={[global.primaryButton]}
          onPress={() => router.push("/(tabs)/explorer")}
        >
          <Text style={global.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: height * 0.03 }}>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/resetPassword")}
          >
            <Text style={{ color: "#000000ff", fontSize: 17, fontWeight: 600 }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#7c8390ff",
              width: width * 0.5,
              height: height * 0.001,
              borderRadius: 10,
              marginTop: height * 0.03,
            }}
          ></View>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            style={{ marginTop: height * 0.03 }}
          >
            <Text style={{ color: "#1f1e1eff", fontWeight: 600, fontSize: 17 }}>
              Não possui uma conta? Cadastre-se agora!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default RenderLogin;
