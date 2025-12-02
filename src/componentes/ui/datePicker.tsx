import { useState } from "react"
import {Dimensions, View} from "react-native"
import DatePicker, { getToday } from "react-native-modern-datepicker"

type Props = {
  onSelectDate: (date: string) => void
};

const DateSelector = ({onSelectDate}: Props) => {
  const { width, height} = Dimensions.get("window");
  const today = getToday();
  const [selectDate, setSelectedDate] = useState("");
  
  return (
    <View>
      <DatePicker
      mode="calendar"
      options={{
        backgroundColor: "black",
        textHeaderColor: "white",
        textDefaultColor: "white",
        selectedTextColor: "#fff",
        mainColor: "black",
        textSecondaryColor: "#d4d4d4",
        borderColor: "gray",
        textFontSize: 14,
        textHeaderFontSize: 15,
      }}
      style={{ borderRadius: 15, width: width * 0.60, height: "auto", position: "absolute", zIndex: 1, }}
      isGregorian={true}
      minimumDate={today}
      selected={selectDate}
      onSelectedChange={(date) => {
        setSelectedDate(date);
        onSelectDate(date); 
      }}
      />

    </View>
  );
};
export default DateSelector