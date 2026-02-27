import { useAuth } from '@/contexts/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import React from "react";

export default function TabLayout() {
  const {token, isLoading} = useAuth();
  if(isLoading) return null;

  if(!token){
    return <Redirect href="/(auth)/" />;
  }


  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'grey', headerShown: false }}>
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Minha conta',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reserva"
        options={{
        title: 'Reservas',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="suitcase" color={color} />,
        }}
      />
    </Tabs>
  );
}
