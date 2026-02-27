/* Função: definir o fluxo de navegação entre as telas de autenticação: Login - Cadastro - ResetSenha
Empilhamento de telas: Stack Navigator 3 Funçes para manipular o empilhamento:
push(): empilha uma tela acima da outra
back(): retorna a tela anterior empilhada
replace(): substituir uma tela por outra
*/

import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
    const {token, isLoading} = useAuth();

    if(isLoading) return null; // ou um componente de loading   
    if(token) {
        return <Redirect href="/(tabs)/explorer" />
    }


    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: "Login" }}  />
            <Stack.Screen name="register" options={{ title: "Cadastro" }}  />
            <Stack.Screen name="resetPassword" options={{ title: "Esqueci minha senha" }}  />
            <Stack.Screen name="checkout" options={{ title: "Checkout" }}  />
        </Stack>
    ) 
}
export default AuthLayout;
