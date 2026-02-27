import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useMemo, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { global } from "../ui/style";
import { register } from "@/componentes/register/style"; // ajuste o caminho se necessário
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import { useAuth } from "@/contexts/AuthContext";

// Validação simples de email
function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

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

  const propsCpf = useMaskedInputProps({
    value: cpf,
    onChangeText: setCpf,
    mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/],
  });

  const propsTelefone = useMaskedInputProps({
    value: telefone,
    onChangeText: setTelefone,
    mask: Masks.BRL_PHONE,
  });

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

    // Nome
    if (touched.nome && !nome.trim()) {
      error.nome = "Nome obrigatório";
    }

    // CPF – CORRIGIDO: conta apenas dígitos
    if (touched.cpf) {
      const cleanCpf = cpf.replace(/\D/g, "");
      if (!cpf.trim()) {
        error.cpf = "CPF obrigatório";
      } else if (cleanCpf.length !== 11) {
        error.cpf = "CPF inválido (precisa ter 11 números)";
      }
    }

    // Telefone – similar ao CPF
    if (touched.telefone) {
      const cleanTel = telefone.replace(/\D/g, "");
      if (!telefone.trim()) {
        error.telefone = "Telefone obrigatório";
      } else if (cleanTel.length < 10 || cleanTel.length > 11) {
        error.telefone = "Telefone inválido (10 ou 11 dígitos)";
      }
    }

    // Email
    if (touched.email) {
      if (!email.trim()) {
        error.email = "Email obrigatório";
      } else if (!isValidEmail(email.trim())) {
        error.email = "Digite um email válido";
      }
    }

    // Senha
    if (touched.password) {
      if (!password) {
        error.password = "Senha obrigatória";
      } else if (password.length < 6) {
        error.password = "Mínimo 6 caracteres";
      }
    }

    // Confirmação de senha
    if (touched.confirmPassword) {
      if (!confirmPassword) {
        error.confirmPassword = "Confirme a senha";
      } else if (password && confirmPassword !== password) {
        error.confirmPassword = "As senhas não coincidem";
      }
    }

    return error;
  }, [nome, cpf, telefone, email, password, confirmPassword, touched]);

  const canSubmit =
    nome.trim() &&
    cpf &&
    telefone &&
    email.trim() &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await signUp({
        nome: nome.trim(),
        cpf,
        telefone,
        email: email.trim(),
        senha: password,
      });

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Você já está logado.",
        [{ text: "OK", onPress: () => router.replace("/(tabs)/explorer") }]
      );
    } catch (err: any) {
      Alert.alert("Erro no cadastro", err.message || "Não foi possível criar a conta. Tente novamente.");
      console.log("[REGISTER ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  const { height } = Dimensions.get("window");

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
          onBlur={() => setTouched((p) => ({ ...p, nome: true }))}
          errorText={errors.nome}
        />

        <TextField
          {...propsCpf}
          label="CPF"
          placeholder="000.000.000-00"
          keyboardType="numeric"
          onBlur={() => setTouched((p) => ({ ...p, cpf: true }))}
          errorText={errors.cpf}
        />

        <TextField
          {...propsTelefone}
          label="Telefone"
          placeholder="(15) 99999-9999"
          keyboardType="phone-pad"
          onBlur={() => setTouched((p) => ({ ...p, telefone: true }))}
          errorText={errors.telefone}
        />

        <TextField
          label="Email"
          placeholder="email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          errorText={errors.email}
        />

        <PasswordField
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
          errorText={errors.password}
        />

        <PasswordField
          label="Confirmar senha"
          placeholder="Digite novamente"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() => setTouched((p) => ({ ...p, confirmPassword: true }))}
          errorText={errors.confirmPassword}
        />

        <TouchableOpacity
          style={[
            register.buttonPrimary,
            { opacity: canSubmit ? 1 : 0.6 },
          ]}
          disabled={!canSubmit || loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={register.textContent}>Criar conta</Text>
          )}
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: height * 0.04 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
              Já possui uma conta?{" "}
              <Text style={{ color: "grey" }}>Faça Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default RenderRegister;