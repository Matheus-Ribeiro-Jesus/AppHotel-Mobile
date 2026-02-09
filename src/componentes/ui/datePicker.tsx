import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";

type Props = {
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ onSelectDate }: Props) => {
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <View
      style={{
        backgroundColor: "#0d1117", 
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <DatePicker
        mode="calendar"
        options={{
          mainColor: "#ffffff",
          backgroundColor: "#0d1117",     
          textHeaderColor: "#FFA25B",
          textDefaultColor: "#e0e0e0",
          selectedTextColor: "#000000",
          textSecondaryColor: "#888888",
          borderColor: "rgba(120,120,120,0.3)",
          textFontSize: 15,
          textHeaderFontSize: 16,
          
        }}
        style={{
          borderRadius: 12,
          width: 320,
          height: 400,
        }}
        isGregorian={true}
        minimumDate={today}
        selected={selectedDate}
        onSelectedChange={(date: string) => {
          setSelectedDate(date);
          onSelectDate(date);
        }}
      />
    </View>
  );
};

export default DateSelector;