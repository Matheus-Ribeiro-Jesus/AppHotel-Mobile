import { resetPass } from "@/componentes/resetSenha/style";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/style";
import React, { useState, useMemo } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RenderResetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState<{ email?: boolean }>({});

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.email && !email)
      error.email = "Email obrigatório";

    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um email válido";

    return error;
  }, [email, touched]);

  const canSubmit =
    email &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = () => {
    setTouched({ email: true });
    if (!canSubmit) return;

    router.replace("/(auth)/login");
  };

  const { width, height } = Dimensions.get("window");

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
          value={email}
          onChangeText={setEmail}
          errorText={errors.email}
        />

        <View>
          <TouchableOpacity
            disabled={!canSubmit}
            onPress={handleSubmit}
            style={{ opacity: canSubmit ? 1 : 0.5 }}
          >
            <Text style={resetPass.text}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default RenderResetPassword;
