import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import AuthContainer from '../ui/AuthContainer';

const RenderCheckout = () => {
  return (
    <AuthContainer
      SafeArea2={{ backgroundColor: '#fff' }}
      headerLeft={
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.hotelCard}>
            <Image
              source={require('../../../assets/images/quartos.jpg')}
              style={styles.roomImage}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <Text style={styles.title}>Quarto - Transilvânia</Text>
              <Text style={styles.location}>⚲ Rua das Sombras, 13 - Castelo Assombrado</Text>
              <Text style={styles.price}>R$ 250,00 / Noite</Text>
            </View>
          </View>

          <View style={styles.reservaSection}>
            <Text style={styles.tituloSecao}>Sua Reserva</Text>

            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Data</Text>
              </View>
              <Text style={styles.valor}>12-14 Agosto 2026</Text>
            </View>

            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="people-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Hóspedes</Text>
              </View>
              <Text style={styles.valor}>2 Hóspedes (1 Quarto)</Text>
            </View>

            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="call-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Telefone</Text>
              </View>
              <Text style={styles.valor}>02134345646</Text>
            </View>

            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="reader-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Tipo do Quarto</Text>
              </View>
              <Text style={styles.valor}>Queen Room</Text>
            </View>
          </View>

          <View style={styles.detalhe}>
            <Text style={styles.textDetalhe}>Detalhe do Preço</Text>
            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Preço</Text>
              </View>
              <Text style={styles.valor}>R$ 139,00</Text>
            </View>
            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Taxa de Administração</Text>
              </View>
              <Text style={styles.valor}>R$ 2,50</Text>
            </View>
            <View style={styles.linha}>
              <View style={styles.labelWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icone} />
                <Text style={styles.label}>Preço Total</Text>
              </View>
              <Text style={styles.valor}>R$ 141,50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  textDetalhe: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    height: 140,
    marginBottom: 24,
  },

  detalhe: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  roomImage: {
    width: 160,
    height: '100%',
  },
  details: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  location: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#7ca5e2',
    fontWeight: '600',
  },

  reservaSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  tituloSecao: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icone: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  valor: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 16,
  },
});

export default RenderCheckout;