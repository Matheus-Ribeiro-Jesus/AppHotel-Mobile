import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./style";

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerLeft?: React.ReactNode;
  titleColor?: string;
  subtitleColor?: string;
  containerStyle?: any; 
  headerStyle?: any;
  subtitleStyle?: any;
  logo?: any;                  
  logoStyle?: any;
  SafeArea2?: any;
};

const AuthContainer = ({
  title,
  subtitle,
  children,
  headerLeft,
  containerStyle,
  logo,
  logoStyle,
  SafeArea2,
  titleColor,
  subtitleColor,
}: Props) => {
  return (
    <SafeAreaView style={[global.SafeArea, SafeArea2]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={global.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={[global.container, containerStyle]}>
          {headerLeft && (
            <View style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
              {headerLeft}
            </View>
          )}

          <View style={global.header}>
            {!!logo && (
              <Image
                source={logo}
                style={[global.logo, logoStyle]}
                resizeMode="cover"
              />
            )}

            {!!title && (
              <Text style={[global.title, titleColor && { color: titleColor }]}>
                {title}
              </Text>
            )}

            {!!subtitle && (
              <Text style={[global.subtitle, subtitleColor && { color: subtitleColor }]}>
                {subtitle}
              </Text>
            )}
          </View>

          <View>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthContainer;