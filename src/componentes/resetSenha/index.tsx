import { resetPass } from "@/componentes/resetSenha/style";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Dimensions, Alert } from "react-native";
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
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.email && !email) error.email = "Email obrigatório";

    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um email válido";

    return error;
  }, [email, touched]);

  const canSubmit =
    email &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("[RESET PASSWORD] Enviando recuperação para:", email);

      await new Promise((r) => setTimeout(r, 1500));

      Alert.alert("Sucesso", "Enviamos instruções para o seu e-mail!");
      router.replace("/(auth)");

    } catch (err) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const { height } = Dimensions.get("window");

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
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          errorText={errors.email}
        />

        <TouchableOpacity
          disabled={!canSubmit}
          onPress={handleSubmit}
          style={{
            opacity: canSubmit ? 1 : 0.5,
            marginTop: height * 0.03,
          }}
        >
          <Text style={resetPass.text}>
            {loading ? "Enviando..." : "Recuperar senha"}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RenderResetPassword;
