import { AuthContainer } from "@/componentes/ui/AuthContainer";
import { TextField } from "@/componentes/ui/TextField";

export function RenderLogin() {
  return (
    <AuthContainer
      title="Bem-vindo"
      subtitle="Faça seu login para continuar"
      icon="hotel"
      >
      <TextField label="Email" icon="email"></TextField>
    </AuthContainer>
  );
}
