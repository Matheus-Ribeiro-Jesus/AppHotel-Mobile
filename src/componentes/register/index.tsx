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

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState<{
    nome?: boolean;
    cpf?: boolean;
    telefone?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.nome && !nome) error.nome = "Nome obrigatório";

    if (touched.cpf && !cpf) error.cpf = "CPF obrigatório";

    if (touched.cpf && cpf && cpf.length < 11)
      error.cpf = "Digite um CPF válido";

    if (touched.telefone && !telefone) error.telefone = "Telefone obrigatório";

    if (touched.telefone && telefone && telefone.length < 10)
      error.telefone = "Digite um telefone válido";

    if (touched.email && !email) error.email = "Email obrigatório";
    if (touched.email && email && !isValidRegister(email))
      error.email = "Digite um email válido";

    if (touched.password && !password)
      error.password = "Senha obrigatória";

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
  }, [nome, cpf, telefone, email, password, confirmPassword, touched]);

  const canSubmit =
    nome &&
    cpf &&
    telefone &&
    email &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = () => {
    router.replace("/(auth)");
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
          value={nome}
          onChangeText={setNome}
          errorText={errors.nome}
        />

        <TextField
          label="CPF"
          placeholder="00000000000"
          keyboardType="default"
          value={cpf}
          onChangeText={setCpf}
          errorText={errors.cpf}
        />

        <TextField
          label="Telefone"
          placeholder="15000000000"
          keyboardType="default"
          value={telefone}
          onChangeText={setTelefone}
          errorText={errors.telefone}
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
