import { Image, View, Text } from "react-native";
import { stylesRoom } from "@/componentes/ui/stylesRoom";

type Props = {
  name: string;
  price: number;
  descricao: string,

  containerStyle: any;


};

const RenderRoomCard = ({ name, price, descricao, containerStyle}: Props) => {
  return (
    <View style={[stylesRoom.container, containerStyle]}>
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
      <Text style={stylesRoom.descricao}>{descricao}</Text>
    </View>
  );
};

export default RenderRoomCard;
