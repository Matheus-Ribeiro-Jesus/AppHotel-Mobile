import AuthContainer from "@/componentes/ui/AuthContainer";
import DateSelector from "@/componentes/ui/datePicker";
import TextField from "@/componentes/ui/TextField";
import React, { useState } from "react";
import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputSpin from "../ui/InputSpin";
import RenderRoomCard from "../ui/RoomCard";
import { global } from "../ui/style";

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);

  return (
    <AuthContainer SafeArea2={{ backgroundColor: "#fff" }}>
      <View style={{ position: "relative", flex: 1 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setCalendar(null)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <TouchableOpacity onPress={() => setCalendar("checkin")}>
                <View 
                  style={{ width: width * 0.8, zIndex: 100 }}
                >
                  <TextField
                    label="Check-In"
                    icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                    placeholder="Selecione a data"
                    value={checkIn}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <TouchableOpacity onPress={() => setCalendar("checkout")} style={{ zIndex: 100 }}>
                  <View 
                    style={{ width: width * 0.8, zIndex: 100 }}
                  >
                  <TextField
                    label="Check-Out"
                    icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                    placeholder="Selecione a data"
                    value={checkOut}
                  />
                  </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={global.label}>
                Quantidade de hóspedes
              </Text>
              <InputSpin
                guests={qntGuests}
                onSelectSpin={(guests) => {
                  setQntGuests(guests);
                }}
                minGuests={1}
                maxGuests={6}
                stepGuests={1}
                colorMaxGuests={"#db4048"}
                colorMinGuests={"#98e773"}
              />
            </View>
          </View>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            paddingHorizontal: 3,
          }}
        >
          <View style={{ display: "flex", alignItems: "center", left: 65, }}>
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

        {calendar === "checkin" && (
          <Modal
            visible={true}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setCalendar(null)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setCalendar(null)}
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckIn(date);
                    setCalendar(null);
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}

        {calendar === "checkout" && (
          <Modal
            visible={true}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setCalendar(null)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setCalendar(null)}
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckOut(date);
                    setCalendar(null);
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    </AuthContainer>
  );
};

export default RenderExplorer;
