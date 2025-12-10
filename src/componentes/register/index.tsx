import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useMemo, useState } from "react";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { global } from "../ui/style";
import { register } from "@/componentes/register/style";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

function isValidRegister(email: string) {
  return /^[^\s@&='!"]@[^\s@&='!"].[^\s@&='!"]$/.test(email);
}

const RenderRegister = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.email && !email) error.email = "Email obrigatório";
    if (touched.email && email && !isValidRegister(email))
      error.email = "Digite um email válido";

    if (touched.password && !password) error.password = "Senha obrigatória";

    if (touched.password && password && password.length < 6)
      error.password = "Mínimo de 6 caracteres para a senha";

    if (touched.confirmPassword && !confirmPassword)
      error.confirmPassword = "Confirme sua senha";

    if (
      touched.confirmPassword &&
      confirmPassword &&
      password &&
      confirmPassword !== password
    )
      error.confirmPassword = "As senhas não coincidem";

    return error;
  }, [email, password, confirmPassword, touched]);

  const canSubmit =
    email &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = () => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!canSubmit) return;

    router.replace("/(tabs)/explorer");
  };

  const { width, height } = Dimensions.get("window");

  return (
    <AuthContainer
      title="Cadastro de Usuário"
      subtitle="Hotel Transilvania"
      logo={require("../../../assets/images/profile.png")}
      headerLeft={
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      }
    >
      <View style={[global.content, register.inputs]}>
        <TextField
          label="Nome"
          placeholder="Digite seu nome"
          keyboardType="default"
        />

        <TextField
          label="CPF"
          placeholder="000.000.000-00"
          keyboardType="default"
        />

        <TextField
          label="Telefone"
          placeholder="(15) 00000-0000"
          keyboardType="default"
        />

        <TextField
          label="Email"
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="user@email.com"
          keyboardType="default"
          value={email}
          onChangeText={setEmail}
          errorText={errors.email}
        />

        <PasswordField
          label="Senha"
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="*********"
          value={password}
          onChangeText={setPassword}
          errorText={errors.password}
        />

        <PasswordField
          label="Confirme sua senha"
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="*********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          errorText={errors.confirmPassword}
        />

        <TouchableOpacity
          style={[register.buttonPrimary, { opacity: canSubmit ? 1 : 0.5 }]}
          disabled={!canSubmit}
          onPress={handleSubmit}
        >
          <Text style={register.textContent}>Criar conta</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: height * 0.04 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
              Já possui uma conta?
              <Text style={{ color: "grey" }}> Faça Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default RenderRegister;
