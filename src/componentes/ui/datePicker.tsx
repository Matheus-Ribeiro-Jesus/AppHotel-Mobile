import { useState } from "react";
import { TouchableOpacity, View, Text, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { picker } from "@/componentes/ui/picker";

const RenderDatePicker = ({ label }: {label: string}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const onChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setOpen(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>{label}</Text>
      </TouchableOpacity>

      {Platform.OS === "ios" && (
        <Modal visible={open} transparent={true} animationType="slide">
          <View style={picker.centerView}>
            <View style={picker.modalView}>
              <DateTimePicker
                value={date}
                minimumDate={tomorrow}
                mode="date"
                display="spinner"
                locale="pt-BR"
                onChange={onChange}
              />

              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text>{label}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === "android" && open && (
        <DateTimePicker
          value={date}
          minimumDate={tomorrow}
          mode="date"
          locale="pt-BR"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default RenderDatePicker;
