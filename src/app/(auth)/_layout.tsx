/* Função: definir o fluxo de navegação entre as telas de autenticação: Login - Cadastro - ResetSenha
Empilhamento de telas: Stack Navigator 3 Funçes para manipular o empilhamento:
push(): empilha uma tela acima da outra
back(): retorna a tela anterior empilhada
replace(): substituir uma tela por outra
*/

import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: "Login" }}  />
            {/* <Stack.Screen name="index" options={{ title: "Cadastro" }}  /> */}
            {/* <Stack.Screen name="index" options={{ title: "Esqueci minha senha" }}  /> */}
        </Stack>
    ) 
}

export default AuthLayout;
