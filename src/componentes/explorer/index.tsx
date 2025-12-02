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
  const [calendar, setCalendar] = useState<"checkin" | "checkout">();

  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#fff" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: width * 0.05,
          justifyContent: "center",
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.5 }}>
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
              }}
            />
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.44 }}>
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
        <RenderRoomCard
          image={require("../../../assets/images/quartos.jpg")}
          name="DeLuxe"
          price={200}
          descricao={"Nosso melhor quarto!"}
          icon={{
            lib: "FontAwesome5",
            name: "bed"
          }} containerStyle={{}} />
        
      </ScrollView>

    </AuthContainer>
  );
};

export default RenderExplorer;
