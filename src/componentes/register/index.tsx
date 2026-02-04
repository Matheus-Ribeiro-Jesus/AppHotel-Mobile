import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useMemo, useState } from "react";
import { TouchableOpacity, Text, View, Dimensions, Alert } from "react-native";
import { global } from "../ui/style";
import { register } from "@/componentes/register/style";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

// Validação simples de email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const propsCpf = useMaskedInputProps({
    value: cpf,
    onChangeText: setCpf,
    mask: [
      /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/
    ],
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

  // ----------- VALIDACOES -----------
  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.nome && !nome) error.nome = "Nome obrigatório";

    if (touched.cpf && !cpf) error.cpf = "CPF obrigatório";
    if (touched.cpf && cpf && cpf.length !== 11)
      error.cpf = "Digite um CPF válido";

    if (touched.telefone && !telefone) error.telefone = "Telefone obrigatório";
    if (touched.telefone && telefone && telefone.length < 10)
      error.telefone = "Digite um telefone válido";

    if (touched.email && !email) error.email = "Email obrigatório";
    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um email válido";

    if (touched.password && !password)
      error.password = "Senha obrigatória";

    if (touched.password && password.length < 6)
      error.password = "Mínimo de 6 caracteres";

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

  // ----------- HABILITAR BOTÃO -----------
  const canSubmit =
    nome &&
    cpf &&
    telefone &&
    email &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0 &&
    !loading;

  // ----------- SUBMIT -----------
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("[REGISTER] Dados enviados:", {
        nome,
        cpf,
        telefone,
        email,
        password,
      });

      await new Promise((r) => setTimeout(r, 2000));

      Alert.alert("Conta criada com sucesso!");
      router.replace("/(auth)");

    } catch (err) {
      Alert.alert("Erro", "Não foi possível criar sua conta");
    } finally {
      setLoading(false);
    }
  };

  const { height } = Dimensions.get("window");
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
          value={nome}
          onChangeText={setNome}
          onBlur={() => setTouched((p) => ({ ...p, nome: true }))}
          errorText={errors.nome}
        />

        <TextField
        {...propsCpf}
          label="CPF"
          placeholder="00000000000"
          value={cpf}
          keyboardType="numeric"
          onBlur={() => setTouched((p) => ({ ...p, cpf: true }))}
          errorText={errors.cpf}
        />

        <TextField
          label="Telefone"
          {...propsTelefone}
          placeholder="15999999999"
          value={telefone}
          keyboardType="numeric"
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
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
          errorText={errors.password}
        />

        <PasswordField
          label="Confirme sua senha"
          placeholder="********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() =>
            setTouched((p) => ({ ...p, confirmPassword: true }))
          }
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
