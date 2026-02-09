import { createContext } from "react";

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export default AuthProvider;
