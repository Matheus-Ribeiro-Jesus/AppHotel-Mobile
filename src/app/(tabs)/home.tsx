import { View, Text, StyleSheet } from 'react-native';
import RenderDatePicker from "@/componentes/ui/datePicker";
import RenderRoomCard from "@/componentes/ui/RoomCard"



const Tab = () => {
  return (
    <View style={styles.container}>

      {/* <RenderDatePicker /> */}

      <RenderRoomCard />

    

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Tab;