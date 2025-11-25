import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { global } from "../ui/style";
import { register } from "@/componentes/register/style";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const RenderRegister = () => {
  const router = useRouter();
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
        />

        <PasswordField label="Senha" icon={{ lib: "MaterialIcons", name: "lock" }} placeholder="*********" />

        <PasswordField
          label="Confirme sua senha"
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="*********"
        />

        <TouchableOpacity style={register.buttonPrimary}>
          <Text style={register.textContent}>Criar conta </Text>
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
