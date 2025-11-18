import { View, Text, StyleSheet } from 'react-native';
import RenderDatePicker from "@/componentes/ui/datePicker";



export default function Tab() {
  return (
    <View style={styles.container}>

      <RenderDatePicker />

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
