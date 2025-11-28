import { Text, TouchableOpacity, View, Dimensions} from "react-native";
import AuthContainer from "../ui/AuthContainer";
import InfoReserva from "@/componentes/ui/InfoReservar";
import RenderRoomCard from "../ui/RoomCard";

const RenderReservations = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#fff" }}>
      <View style={{ padding: 15 }}>
      <View style={{ left: 30 }}>
      <RenderRoomCard />
      </View>

        <InfoReserva
          dateCheckin="10/12/2024"
          dateCheckout="14/12/2024"
          dayMonthIn="10 Dez"
          dayMonthOut="14 Dez"
        />

        <InfoReserva
          dateCheckin="10/12/2024"
          dateCheckout="14/12/2024"
          dayMonthIn="10 Dez"
          dayMonthOut="14 Dez"
        />
      </View>

      <View style={{left: 115 }}>
        <TouchableOpacity style={{ backgroundColor: "#e7e4e4ff", borderRadius: 20, width: width * 0.4, padding: width * 0.03, alignItems: "center",}}>
          <Text>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RenderReservations;
