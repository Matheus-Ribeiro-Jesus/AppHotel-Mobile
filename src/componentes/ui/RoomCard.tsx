import React, { memo } from "react";
import {
  Image,
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { stylesRoom } from "@/componentes/ui/stylesRoom";

type Props = {
  name: string;
  price: number;
  descricao: string;
  image?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onDelete?: () => void;
};

const RenderRoomCard = ({
  image,
  name,
  price,
  descricao,
  containerStyle,
  onPress,
  onDelete,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={stylesRoom.principal}>
        <View style={[stylesRoom.container, containerStyle]}>
          {image && (
            <Image
              style={stylesRoom.imagem}
              source={image}
              resizeMode="cover"
            />
          )}

          <View style={stylesRoom.infoSection}>
            <Text style={stylesRoom.title}>{name}</Text>

            <Text style={stylesRoom.price}>
              <Text style={stylesRoom.priceValue}>R$ {price}</Text> por noite
            </Text>
          </View>

          <Text style={stylesRoom.descricao}>{descricao}</Text>

          {onDelete && (
            <TouchableOpacity
              style={stylesRoom.botaoFechar}
              onPress={onDelete}
              activeOpacity={0.7}
            >
              <Text style={stylesRoom.text}>Apagar quarto</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RenderRoomCard);
