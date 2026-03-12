import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import InfoReserva from "@/componentes/ui/InfoReservar";
import { CartReservation, useAuth } from "@/contexts/AuthContext";
import React, { useMemo, useState } from "react";
import AuthContainer from "../ui/AuthContainer";
import RenderRoomCard from "../ui/RoomCard";

const RenderReservations = () => {
  const { width } = Dimensions.get("window");

  const { cartReservations = [], removeReservationFromCard, createOrder } = useAuth();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const rooms: CartReservation[] = cartReservations;
  const selectedRoom = rooms[selectedIndex] || null;

  const difDias = (inicio: string, fim: string) => {
    try {
      const d1 = new Date(inicio);
      const d2 = new Date(fim);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  };

  const formatDayMonth = (iso: string) => {
    try {
      const d = new Date(iso);
      const day = d.getDate();
      const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
      return `${day} ${monthNames[d.getMonth()]}`;
    } catch {
      return '';
    }
  };

  const total = useMemo(() => {
    return rooms.reduce((soma, r) => {
      const dias = difDias(r.dataInicio, r.dataFim);
      return soma + r.preco * r.quantidade * dias;
    }, 0);
  }, [rooms]);

  const handleDeleteRoom = (index: number) => {
    removeReservationFromCard(index);
    setSelectedIndex((prev) => {
      const newLen = rooms.length - 1;
      if (prev >= newLen) {
        return Math.max(0, newLen - 1);
      }
      return prev;
    });
  };

  const handleCheckout = async () => {
    try {
      await createOrder('pix');
      Alert.alert('Sucesso', 'Pedido criado com sucesso!');
    } catch (err: any) {
      Alert.alert('Erro', err?.message || 'Falha ao criar pedido');
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

          {rooms.length === 0 ? (
            <Text style={[styles.infoText, { marginTop: 10 }]}>Carrinho vazio</Text>
          ) : (
            <View style={styles.quartosContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quartosContent}
              >
                {rooms.map((room, idx) => (
                  <RenderRoomCard
                    key={`${room.quartoId}-${idx}`}
                    image={require("../../../assets/images/quartos.jpg")}
                    name={room.nome}
                    price={room.preco}
                    descricao={`Quantidade: ${room.quantidade}`}
                    containerStyle={{
                      borderWidth: selectedIndex === idx ? 2 : 0,
                      borderColor: "#ffffff",
                    }}
                    onPress={() => setSelectedIndex(idx)}
                    onDelete={() => handleDeleteRoom(idx)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Datas */}
        <View style={styles.infoWrapper}>
          <Text style={styles.sectionTitle}>Período da Estadia</Text>

          <View style={styles.dateCard}>
            <View style={styles.dateInner}>
              <InfoReserva
                dateCheckin={selectedRoom?.dataInicio || ''}
                dateCheckout={selectedRoom?.dataFim || ''}
                dayMonthIn={selectedRoom ? formatDayMonth(selectedRoom.dataInicio) : ''}
                dayMonthOut={selectedRoom ? formatDayMonth(selectedRoom.dataFim) : ''}
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
                ? `${selectedRoom.nome} • ${difDias(selectedRoom.dataInicio, selectedRoom.dataFim)} noites`
                : "Nenhum quarto selecionado"}
            </Text>

            <Text style={styles.infoText}>
              Impostos inclusos • Pagamento no check-in
            </Text>
          </View>
        </View>

        {/* Botão */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.button, { width: width * 0.85 }]}
            onPress={handleCheckout}
            disabled={rooms.length === 0}
          >
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