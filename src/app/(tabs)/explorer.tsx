import { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import AuthContainer from "@/componentes/ui/AuthContainer";
import DateSelector from "@/componentes/ui/datePicker";
import TextField from "@/componentes/ui/TextField";

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout">();

  return (
    <AuthContainer>
      <View>
        <TouchableOpacity onPress={() => setCalendar("checkin")}>
          <TextField
            label="Check-In"
            icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
            placeholder="Selecione a data"
            value={checkIn}
          />
        </TouchableOpacity>

       {calendar === "checkin" && (
          <DateSelector 
          onSelectDate={(date)=>{
            setCheckOut(date);
          }}
          />
        )}


        <TouchableOpacity onPress={() => setCalendar("checkout")}>
          <TextField
            label="Check-In"
            icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
            placeholder="Selecione a data"
            value={checkIn}
          />
        </TouchableOpacity>
        
       {calendar === "checkout" && (
          <DateSelector 
          onSelectDate={(date)=>{
            setCheckOut(date);
          }}
          />
        )}

      </View>
    </AuthContainer>
  )
};