import { Dimensions, Image, Text, View } from "react-native";
import { infoReservar } from "@/componentes/ui/infoReservaStyles";
import React from "react";

type Props = {
  dateCheckin: string; 
  dateCheckout: string;
  dayMonthIn: string;  
  dayMonthOut: string; 
  
};

const InfoReserva = ({ dateCheckin, dateCheckout, dayMonthIn, dayMonthOut }: Props) => {
  const { width } = Dimensions.get("window");

  const DateCircle = ({ label, date }: { label: string; date: string }) => (
    <View style={{ alignItems: "center", marginTop: width * 0.04 }}>
      <Text style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
        {label}
      </Text>
      <View
        style={{
          backgroundColor: "#e0e0e0",
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#000" }}>{date}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ marginVertical: 12 }}>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <DateCircle label="Check-in" date={dayMonthIn} />

        <View style={infoReservar.content}>
          <Image
            source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
            style={infoReservar.image}
          />
          <Text style={{ marginLeft: 12, fontWeight: "600", fontSize: 16 }}>
            {dateCheckin}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
        <DateCircle label="Check-out" date={dayMonthOut} />

        <View style={infoReservar.content}>
          <Image
            source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
            style={infoReservar.image}
          />
          <Text style={{ marginLeft: 12, fontWeight: "600", fontSize: 16 }}>
            {dateCheckout}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoReserva;