import RenderRoomCard from "@/componentes/ui/RoomCard";
import { ScrollView, View } from 'react-native';

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
    </View>
  );
};

export default Tab;

