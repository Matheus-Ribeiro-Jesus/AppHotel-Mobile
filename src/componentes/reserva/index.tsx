import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";

import AuthContainer from "../ui/AuthContainer";
import InfoReserva from "@/componentes/ui/InfoReservar";
import RenderRoomCard from "../ui/RoomCard";
import React from "react";

const RenderReservations = () => {
  const { width } = Dimensions.get("window");
  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#f9f9f9", marginTop: -25 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Resumo da Reserva</Text>
          <Text style={styles.subTitle}>
            Confira as informações antes de finalizar
          </Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Quartos Reservados</Text>

          <View style={styles.quartosContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quartosContent}
            >
              <RenderRoomCard
                image={require("../../../assets/images/quartos.jpg")}
                name={"DeLuxe"}
                price={200}
                descricao={"Nosso melhor quarto"}
                containerStyle={{}}
                />

            </ScrollView>
          </View>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Datas da Estadia</Text>

          <View style={styles.card}>
            <InfoReserva
              dateCheckin="10/12/2024"
              dateCheckout="14/12/2024"
              dayMonthIn="10 Dez"
              dayMonthOut="14 Dez"
            />
          </View>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Resumo da reserva</Text>

          <View style={styles.card}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>R$ 200,00</Text>
            </View>
            <Text style={styles.infoText}>
              Inclui impostos • Pagamento na chegada
            </Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.button, { width: width * 0.85 }]}>
            <Text style={styles.buttonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderReservations;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 27,
    paddingHorizontal: 20,
  },

  headerSection: {
    marginBottom: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  subTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  infoWrapper: {
    marginBottom: 40,
  },
  infoText: {
    fontSize: 13,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  /* ---- QUARTOS ---- */

  quartosContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  quartosContent: {
    gap: 16,
    paddingHorizontal: 4,
  },

  /* ---- CARD PADRÃO ---- */

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  /* ---- BOTÃO ---- */

  buttonWrapper: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#2a6fdd",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#2a6fdd",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2a6fdd",
  },
});
