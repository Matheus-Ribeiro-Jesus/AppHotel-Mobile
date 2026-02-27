import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

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
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Carregar token ao abrir o app 
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
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        });
        // back-end retorna erro {erro: "..."} quando falha
        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.erro || error?.message || "Credenciais inválidas");
        }

        // back-end retorna {token: "..."} quando sucesso
        const data = await res.json();
        const tokenFromAPI = data.token;
        await AsyncStorage.setItem("token", tokenFromAPI);
        setToken(tokenFromAPI);
    }

    async function signUp({
        nome,
        cpf,
        telefone,
        email,
        senha,
    }: {
        nome: string;
        cpf: string;
        telefone: string;
        email: string;
        senha: string;
    }) {
        const cleanCpf = cpf.replace(/\D/g, "");
        const cleanTelefone = telefone.replace(/\D/g, "");

        // Validação básica após limpeza (opcional, mas recomendado para consistência)
        if (cleanCpf.length !== 11) {
            throw new Error("CPF inválido (deve ter 11 dígitos)");
        }
        if (cleanTelefone.length < 10 || cleanTelefone.length > 11) {
            throw new Error("Telefone inválido (deve ter 10 ou 11 dígitos)");
        }

        const res = await fetch(`${API_URL}/login/cadastro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                cpf: cleanCpf,
                telefone: cleanTelefone,
                email,
                senha,
            }),
        });

        if (!res.ok) {
            let errorMessage = "Erro ao criar conta";
            try {
                const errorData = await res.json();
                errorMessage = errorData.erro || errorData.message || "Falha no cadastro";
            } catch {}
            throw new Error(errorMessage);
        }

        const data = await res.json();
        const tokenFromAPI = data.token;

        if (tokenFromAPI) {
            await AsyncStorage.setItem("token", tokenFromAPI);
            setToken(tokenFromAPI);
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo(() => ({ token, isLoading, signIn, signUp, signOut }),
        [token, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return ctx;
};

export default AuthProvider;