import { Image, View, Text, ImageSourcePropType } from "react-native";
import { stylesRoom } from "@/componentes/ui/stylesRoom";
import { MaterialIcons, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

type NameIcon =
  | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
  | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap }
  | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap };

type Props = {
  name: string;
  price: number;
  descricao: string;
  image?: ImageSourcePropType;
  containerStyle?: any;
  icon?: NameIcon;
};

const RenderRoomCard = ({
  image,
  name,
  price,
  descricao,
  containerStyle,
  icon,
}: Props) => {
  return (
    <View style={[stylesRoom.principal]}>
      <View style={[stylesRoom.container, containerStyle]}>
        {!!image && (
          <View>
            <Image
              style={stylesRoom.imagem}
              source={image}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={stylesRoom.infoSection}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={stylesRoom.title}>{name}</Text>

            {!!icon && (
              <View style={{ left: 5, top: 1 }}>
                {icon.lib === "MaterialIcons" && (
                  <MaterialIcons name={icon.name} size={23} color="black" />
                )}
                {icon.lib === "FontAwesome5" && (
                  <FontAwesome5 name={icon.name} size={20} color="black" />
                )}
                {icon.lib === "FontAwesome6" && (
                  <FontAwesome6 name={icon.name} size={23} color="black" />
                )}
              </View>
            )}
          </View>
          <Text style={stylesRoom.price}>
            <Text style={{ fontWeight: "bold", color: "blue", fontSize: 16 }}>
              R$ {price}
            </Text>{" "}
            por noite
          </Text>
        </View>
        <Text style={stylesRoom.descricao}>{descricao}</Text>
      </View>
    </View>
  );
};

export default RenderRoomCard;
