import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signUp: (data: {
        nome: string;
        cpf: string;
        telefone: string;
        email: string;
        senha: string;
    }) => Promise<void>;
    signOut: () => Promise<void>;
    consulta: (inicio: string, fim: string, quantidade: number) => Promise<any>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) setToken(storedToken);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

        async function signIn(email: string, senha: string) {
        try {
            const url = `${API_URL}/login`;
            console.log("[LOGIN] URL:", url);
            console.log("[LOGIN] Body enviado:", { email, senha });

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),  // confirma que é "senha", não "password"
            });

            console.log("[LOGIN] Status:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.log("[LOGIN] Erro do backend:", errorText);
                throw new Error(errorText || "Falha no login");
            }

            const tokenAPI = await res.json();
            console.log("[LOGIN] Token recebido:", tokenAPI);

            await AsyncStorage.setItem("token", tokenAPI);
            setToken(tokenAPI);

            return tokenAPI; // opcional
        } catch (err) {
            console.error("[LOGIN] Erro completo:", err);
            throw err;
        }
    }
    async function consulta(inicio: string, fim: string, quantidade: number) {
        const url = `${API_URL}/quartosDisponiveis`;  

        console.log("[DEBUG] URL consultada (POST):", url);
        console.log("[DEBUG] Body enviado:", { dataInicio: inicio, dataFim: fim, quantidade });

        const res = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dataInicio: inicio,   
                dataFim: fim,
                quantidade
            }),
        });

        if (!res.ok) {
            let errorMessage = "Erro ao consultar quartos";
            try {
                const errorData = await res.json();
                console.log("[DEBUG] Resposta de erro completa do backend:", res.status, errorData);
                errorMessage = errorData.erro || errorData.message || errorMessage;
            } catch (e) {
                console.log("[DEBUG] Sem JSON no erro, status:", res.status);
            }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        console.log("[DEBUG] Dados retornados pelo backend:", data);
        return data;
    }
    async function signUp({ nome, cpf, telefone, email, senha }: { nome: string; cpf: string; telefone: string; email: string; senha: string; }) {
        const cleanCpf = cpf.replace(/\D/g, "");
        const cleanTelefone = telefone.replace(/\D/g, "");

        if (cleanCpf.length !== 11) throw new Error("CPF inválido (11 dígitos)");
        if (cleanTelefone.length < 10 || cleanTelefone.length > 11) throw new Error("Telefone inválido (10 ou 11 dígitos)");

        const res = await fetch(`${API_URL}/login/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, cpf: cleanCpf, telefone: cleanTelefone, email, senha }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.erro || errorData.message || "Falha no cadastro");
        }

        const { token: tokenFromAPI } = await res.json();
        if (tokenFromAPI) {
            await AsyncStorage.setItem("token", tokenFromAPI);
            setToken(tokenFromAPI);
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo(() => ({ token, isLoading, signIn, signUp, signOut, consulta }), [token, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return ctx;
};

export default AuthProvider;