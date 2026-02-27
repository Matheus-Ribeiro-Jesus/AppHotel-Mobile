import AuthContainer from "@/componentes/ui/AuthContainer";
import TextField from "@/componentes/ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useMemo, useState } from "react";
import { TouchableOpacity, Text, View, Dimensions, Alert } from "react-native";
import { global } from "../ui/style";
import { login } from "@/componentes/login/login";
import { useRouter } from "expo-router";
import AuthContext, { useAuth } from "@/contexts/AuthContext";

function isValidEmail(email: string) {
  return /^[^\s@&='!"]@[^\s@&='!"].[^\s@&='!"]$/.test(email);
}

const RenderLogin = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const erros = useMemo(() => {
    const error: Record<string, string> = {};
    if (touched.email && !email) error.email = "Email obrigatorio";
    if (touched.password && !password) error.password = "Senha obrigatoria";
    if (touched.password && password && password.length < 6)
      error.password = "Minimo de 6 caracteres para a senha";
    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um email válido";

    return error;
  }, [email, password, touched]);

  const canSubmit =
    email && password && Object.keys(erros).length === 0 && !loading;

const handleSubmit = async () => {
        try {
            setLoading(true);
 
console.log("Tentando logar com:", { email, password });

            await signIn(email.trim(), password.trim());
 
            Alert.alert("Login bem-sucedido!");
            router.replace("/(tabs)/explorer");
        }
        catch (erro) {Alert.alert("Erro", "Falha ao tentar logar!");}
        finally {setLoading(false);}
    };

  const { width, height } = Dimensions.get("window");
  return (
    <AuthContainer
      title="Bem-vindo ao Transilvania"
      subtitle="Por favor insira seus dados"
      logo={require("../../../assets/images/logo.png")}
    >
      <View style={[global.content, login.texts]}>
        <TextField
          label="E-mail"
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="user@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(input) => setEmail(input)}
          errorText={erros.email}
        />

        <PasswordField
          label="Senha"
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="*********"
          value={password}
          onChangeText={(input) => setPassword(input)}
          errorText={erros.password}
        />
        <TouchableOpacity
          style={[global.primaryButton]}
          onPress={handleSubmit}
          disabled={!canSubmit}
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
              backgroundColor: "rgb(0, 0, 0)",
              width: width * 0.5,
              height: height * 0.001,
              borderRadius: 10,
              marginTop: height * 0.02,
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
