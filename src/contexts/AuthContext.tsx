import React, { createContext, useState, useEffect, useMemo, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setisLoading] = useState(true);

    //Carregar token ao abrir o app 

    useEffect(() => {
        (async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) setToken(storedToken);
            } finally {
                setisLoading(false);
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
        if(!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.message || "Credenciais inválidas");
        }

        // back-end retorna {token: "..."} quando sucesso
        const TokenAPI: string = await res.json();
        await AsyncStorage.setItem("token", TokenAPI);
        setToken(TokenAPI);
    }

    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo(() => ({ token, isLoading, signIn, signOut}),
        [token, isLoading]
    );
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return ctx;
};


export default AuthProvider;
