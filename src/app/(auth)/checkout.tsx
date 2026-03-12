import RenderCheckout from "@/componentes/checkout";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const Login = () => {
  const { cartReservations = [] } = useAuth();
  return <RenderCheckout cart={cartReservations} />;
};
export default Login;

