import { Dimensions, View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const RenderCheckout = () => {
  const { width } = Dimensions.get("window");

  return (
    <AuthContainer
      SafeArea2={{ backgroundColor: "#fff" }}
      headerLeft={
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.hotelCard}>
          {/* Imagem à esquerda – agora ajustada com require */}
          <Image
            source={require("../../../assets/images/quartos.jpg")} // ← caminho que você pediu; ajuste se necessário
            style={styles.roomImage}
            resizeMode="cover" // mantém a imagem preenchendo sem distorcer
          />

          {/* Textos à direita – mantidos exatamente como no original */}
          <View style={styles.details}>
            <Text style={styles.title}>Quarto - Transilvânia</Text>
            <Text style={styles.location}>⚲ Rua das Sombras, 13 - Castelo Assombrado</Text>
            <Text style={styles.price}>R$ 250,00 / Noite</Text>
          </View>
        </View>

        {/* Espaço para mais conteúdo do checkout se precisar */}
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  hotelCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9", // fundo sutil para destacar
    borderRadius: 16,
    overflow: "hidden", // garante que a imagem respeite as bordas arredondadas
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  roomImage: {
    width: 145,                // largura maior para melhor visual
    aspectRatio: 4 / 3,        // proporção 4:3 – ajusta altura automaticamente (não distorce)
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  details: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",  // centraliza os textos verticalmente
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  location: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#7ca5e2",
    fontWeight: "600",
  },
});

export default RenderCheckout;