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
import React, { useState } from "react";

const RenderReservations = () => {
  const { width } = Dimensions.get("window");

  // Lista de quartos
  const [rooms, setRooms] = useState([
    {
      name: "DeLuxe",
      price: 200,
      descricao: "Nosso melhor quarto",
      image: require("../../../assets/images/quartos.jpg"),
    },
    {
      name: "DeLuxe Premium",
      price: 200,
      descricao: "Nosso melhor quarto",
      image: require("../../../assets/images/quartos2.jpg"),
    },
    {
      name: "Quarto Queen",
      price: 520,
      descricao: "Nosso melhor quarto",
      image: require("../../../assets/images/quartos3.jpg"),
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState<any>(rooms[0] || null);

  const days = 2;
  const total = selectedRoom ? selectedRoom.price * days : 0;

  const handleDeleteRoom = (roomName: string) => {
    const updatedRooms = rooms.filter((room) => room.name !== roomName);

    setRooms(updatedRooms);

    // Se não sobrou nenhum quarto
    if (updatedRooms.length === 0) {
      setSelectedRoom(null);
      return;
    }

    // Se deletou o quarto selecionado
    if (selectedRoom?.name === roomName) {
      setSelectedRoom(updatedRooms[0]);
    }
  };

  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#f9f9f9", marginTop: -70 }}>
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

        {/* Quartos */}
        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Quartos Reservados</Text>

          <View style={styles.quartosContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quartosContent}
            >
              {rooms.map((room) => (
                <RenderRoomCard
                  key={room.name}
                  image={room.image}
                  name={room.name}
                  price={room.price}
                  descricao={room.descricao}
                  containerStyle={{
                    borderWidth: selectedRoom?.name === room.name ? 2 : 0,
                    borderColor: "#99999ab4",
                  }}
                  onPress={() => setSelectedRoom(room)}
                  onDelete={() => handleDeleteRoom(room.name)}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Datas */}
        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Período da Estadia</Text>

          <View style={styles.dateCard}>
            <View style={styles.dateInner}>
              <InfoReserva
                dateCheckin="10/12/2024"
                dateCheckout="14/12/2024"
                dayMonthIn="10 Dez"
                dayMonthOut="14 Dez"
              />
            </View>
          </View>
        </View>

        {/* Resumo */}
        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Resumo da Reserva</Text>

          <View style={styles.card}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>
                {total > 0 ? `R$ ${total},00` : "--"}
              </Text>
            </View>

            <Text style={styles.infoText}>
              {selectedRoom
                ? `${selectedRoom.name} • ${days} noites`
                : "Nenhum quarto selecionado"}
            </Text>

            <Text style={styles.infoText}>
              Impostos inclusos • Pagamento no check-in
            </Text>
          </View>
        </View>

        {/* Botão */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.button, { width: width * 0.85 }]}>
            <Text style={styles.buttonText}>Finalizar Reserva</Text>
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

  quartosContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  quartosContent: {
    gap: 16,
    paddingHorizontal: 4,
  },

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

  dateCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: "#f2f2f2",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  dateInner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});