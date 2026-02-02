import RenderReservations from '@/componentes/reserva';
import React from 'react';
import { View } from 'react-native';

const Tab = () => {
  return (
    <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>

      <RenderReservations />
        
    </View>
  );
};

export default Tab;

