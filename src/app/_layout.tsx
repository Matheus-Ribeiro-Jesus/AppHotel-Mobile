import { Slot, Stack } from "expo-router";
import AuthProvider from "../contexts/AuthContext";
import React from "react";


const RootLayout = () => {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    )
};


export default RootLayout;