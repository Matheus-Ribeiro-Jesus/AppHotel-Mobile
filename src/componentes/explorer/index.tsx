import { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import AuthContainer from "@/componentes/ui/AuthContainer";
import DateSelector from "@/componentes/ui/datePicker";
import TextField from "@/componentes/ui/TextField";
import RenderRoomCard from "../ui/RoomCard";

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);

  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#fff" }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-In"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkIn}
              />
            </View>
          </TouchableOpacity>

          {calendar === "checkin" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckIn(date);
                setCalendar(null);
              }}
            />
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-In"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkOut}
              />
            </View>
          </TouchableOpacity>

          {calendar === "checkout" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckOut(date);
                setCalendar(null);
              }}
            />
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          paddingHorizontal: 3,
        }}
      >
        <View style={{ display: "flex", alignItems: "center", left: 35, }}>
          <RenderRoomCard
            image={require("../../../assets/images/quartos.jpg")}
            name="DeLuxe"
            price={200}
            descricao={"Nosso melhor quarto!"}
            icon={{
              lib: "FontAwesome5",
              name: "bed",
            }}
          />
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderExplorer;
