import React, { useMemo, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";

import { global } from "../ui/style";
import { register } from "@/componentes/register/style";

import { useAuth } from "@/contexts/AuthContext"; 

// Validação simples de email
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const RenderRegister = () => {
  const router = useRouter();
  const { signUp } = useAuth();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { height } = Dimensions.get("window");

  // Máscaras
  const cpfMaskProps = useMaskedInputProps({
    value: cpf,
    onChangeText: setCpf,
    mask: [
      /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/,
    ],
  });

  const telefoneMaskProps = useMaskedInputProps({
    value: telefone,
    onChangeText: setTelefone,
    mask: Masks.BRL_PHONE,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Erros
  const errors = useMemo(() => {
    const err: Record<string, string> = {};

    if (touched.nome && !nome.trim()) err.nome = "Nome obrigatório";

    if (touched.cpf && !cpf) err.cpf = "CPF obrigatório";

    if (touched.telefone && !telefone) err.telefone = "Telefone obrigatório";
    if (touched.telefone && telefone && telefone.length < 10)
      err.telefone = "Digite um telefone válido";

    if (touched.email && !email.trim()) err.email = "Email obrigatório";
    if (touched.email && email && !isValidEmail(email))
      err.email = "Digite um email válido";

    if (touched.password && !password) err.password = "Senha obrigatória";
    if (touched.password && password.length < 6)
      err.password = "Mínimo de 6 caracteres";

    if (touched.confirmPassword && !confirmPassword)
      err.confirmPassword = "Confirme sua senha";

    if (
      touched.confirmPassword &&
      confirmPassword &&
      password &&
      confirmPassword !== password
    ) {
      err.confirmPassword = "As senhas não coincidem";
    }

    return err;
  }, [nome, cpf, telefone, email, password, confirmPassword, touched]);

  const canSubmit =
    nome.trim() &&
    cpf &&
    telefone &&
    email.trim() &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setLoading(true);

    try {
      await signUp({
        nome: nome.trim(),
        cpf,
        telefone,
        email: email.trim(),
        senha: password,
      });

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace("/(tabs)/explorer");
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.message || "Não foi possível criar sua conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Cadastro de Usuário"
      subtitle="Hotel Transilvania"
      logo={require("../../../assets/images/logo.png")}
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
          value={nome}
          onChangeText={setNome}
          onBlur={() => setTouched((prev) => ({ ...prev, nome: true }))}
          errorText={errors.nome}
          autoCapitalize="words"
        />

        <TextField
          label="CPF"
          {...cpfMaskProps}
          value={cpf}
          keyboardType="numeric"
          onBlur={() => setTouched((prev) => ({ ...prev, cpf: true }))}
          errorText={errors.cpf}
        />

        <TextField
          label="Telefone"
          {...telefoneMaskProps}
          value={telefone}
          keyboardType="phone-pad"
          onBlur={() => setTouched((prev) => ({ ...prev, telefone: true }))}
          errorText={errors.telefone}
        />

        <TextField
          label="Email"
          placeholder="email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          errorText={errors.email}
        />

        <PasswordField
          label="Senha"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          errorText={errors.password}
        />

        <PasswordField
          label="Confirme sua senha"
          placeholder="********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
          errorText={errors.confirmPassword}
        />

        <TouchableOpacity
          style={[register.buttonPrimary, { opacity: canSubmit ? 1 : 0.5 }]}
          disabled={!canSubmit}
          onPress={handleSubmit}
        >
          <Text style={register.textContent}>
            {loading ? "Carregando..." : "Criar conta"}
          </Text>
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