import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RenderDatePicker from "@/componentes/ui/datePicker";
import RenderRoomCard from "@/componentes/ui/RoomCard"

const Tab = () => {
  return (
    <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <RenderRoomCard />
        <RenderRoomCard />
        <RenderRoomCard />
      </ScrollView>

      <RenderDatePicker label='Data de check-in' />
      <RenderDatePicker label='Data de check-out' />
    </View>
  );
};

export default Tab;

