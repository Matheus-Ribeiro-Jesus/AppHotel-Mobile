import AuthContainer from "@/componentes/ui/AuthContainer";
import TextField from "@/componentes/ui/TextField";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity, Text } from "react-native";
import { global } from "../ui/style";

const RenderLogin = () => {
  return (
    <AuthContainer
      title="Bem-vindo ao Transilvania"
      subtitle="Faça seu login para continuar"
      icon="hotel"
      >
      <TextField 
      label="Email" 
      icon="email"
      placeholder="user@email.com"
      keyboardType="email-address"

      />
    
     <PasswordField 
      label="Senha"
      icon="lock"
      placeholder="*********"

     />

     <TouchableOpacity style={[global.primaryButton]}>
      <Text style={global.primaryButtonText}>Entrar</Text>

     </TouchableOpacity>

    </AuthContainer>
  )
}

export default RenderLogin;