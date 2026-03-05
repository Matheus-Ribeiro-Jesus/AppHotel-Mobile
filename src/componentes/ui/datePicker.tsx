import React from "react";
import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";

type Props = {
  onSelectDate: (date: string) => void;
};

const RenderDatePicker = ({ onSelectDate }: Props) => {
  const { width } = Dimensions.get("window");
  const today = getToday();

  const handleChange = (date: string) => {
    onSelectDate?.(date);
  };

  return (
    <View
      style={{
        width: width * 0.9,
        position: "relative",
      }}
    >
      <DatePicker
        mode="calendar"
        current={today}
        minimumDate={today}
        isGregorian={true}
        options={{
          backgroundColor: "#090C08",
          textHeaderColor: "#ff5b5bff",
          textDefaultColor: "#f6c1c1ff",
          selectedTextColor: "#fff",
          mainColor: "#f42b2bff",
          textSecondaryColor: "#d6a9a1ff",
          borderColor: "rgba(122, 146, 165, 0.1)",
          textHeaderFontSize: 14,
          textFontSize: 12,
          headerAnimationDistance: 8,
          daysAnimationDistance: 6,
        }}
        style={{
          borderRadius: 15,
          width: width * 0.69,
          zIndex: 1,
        }}
        // ✅ funciona corretamente
        onSelectedChange={handleChange}

        // ✅ workaround do bug da lib
        onDateChange={handleChange}
      />
    </View>
  );
};

export default RenderDatePicker;