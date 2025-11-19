import { Image, StyleSheet, View, Text } from "react-native";
import { stylesRoom } from "@/componentes/ui/stylesRoom"

const RenderRoomCard = () => {
  return (
    <View style={stylesRoom.container}>
      <Image
        source={{ uri: "https://picsum.photos/300" }}
        style={stylesRoom.image}
      />

      <View style={stylesRoom.infoSection}>
        <Text style={stylesRoom.title}>DeLuxe</Text>
        <Text style={stylesRoom.price}>R$ 200 por 2 noites</Text>
      </View>
    </View>
  );
};


export default RenderRoomCard;
