import { Image, View, Text } from "react-native";
import { stylesRoom } from "@/componentes/ui/stylesRoom";

type Props = {
  name: string;
  price: string;
  descricao: string,

};

const RenderRoomCard = ({ name, price }: Props) => {
  return (
    <View style={stylesRoom.container}>
      <Image
        source={require("../../../assets/images/quartos.jpg")}
        style={stylesRoom.image}
      />

      <View style={stylesRoom.infoSection}>
        <Text style={stylesRoom.title}>{name}</Text>
        <Text style={stylesRoom.price}>
          <Text style={{ fontWeight: "bold", color: "blue", fontSize: 16, }}>R$ {price}</Text>{" "}
          por noite
        </Text>
      </View>
    </View>
  );
};

export default RenderRoomCard;
