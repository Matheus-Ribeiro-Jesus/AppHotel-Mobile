import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AuthContainer from '@/componentes/ui/AuthContainer';
import DateSelector from '@/componentes/ui/datePicker';
import TextField from '@/componentes/ui/TextField';
import { useAuth } from '@/contexts/AuthContext';
import InputSpin from '../ui/InputSpin';

const { width, height} = Dimensions.get('window');

const RenderExplorer = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [qntHospedes, setQntHospedes] = useState(1);
  const [calendario, setCalendario] = useState<'entrada' | 'saida' | null>(null);
  const { consulta } = useAuth();

  const [quantidades, setQuantidades] = useState<{ [key: number]: number }>({});

  const quartos = [
    {
      id: 0,
      tipo: 'Superior Duplo',
      imagem: require('../../../assets/images/quartos.jpg'),
      tamanho: '22 m²',
      preco: 308.70,
    },
    {
      id: 1,
      tipo: 'Duplo Premium',
      imagem: require('../../../assets/images/quartos.jpg'),
      tamanho: '30 m²',
      preco: 380.00,
    },
  ];

  const precoTotal = quartos.reduce((soma, quarto) => {
    const qtd = quantidades[quarto.id] || 0;
    return soma + quarto.preco * qtd;
  }, 0);

  const atualizarQuantidade = (quartoId: number, delta: number) => {
    setQuantidades((anterior) => ({
      ...anterior,
      [quartoId]: Math.max(0, (anterior[quartoId] || 0) + delta),
    }));
  };

  const abrirCalendario = (tipo: 'entrada' | 'saida') => {
    setCalendario(tipo);
  };

  return (
    <AuthContainer SafeArea2={{ backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.cabecalhoBusca}>
          <Text style={styles.tituloCabecalho}>Escolher quartos</Text>
        </View>

        <View style={styles.cardDatas}>
          <Text style={styles.tituloDatas}>Datas da reserva</Text>

          <TouchableOpacity onPress={() => abrirCalendario('entrada')}>
            <View style={styles.wrapperCampo}>
              <TextField
                label="Check-in"
                icon={{ lib: 'Ionicons', name: 'calendar-outline' }}
                placeholder="Selecione a data"
                value={checkIn}
                editable={false}
                pointerEvents="none"
                style={{ paddingRight: 40 }}
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={styles.iconeCampo}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => abrirCalendario('saida')}>
            <View style={styles.wrapperCampo}>
              <TextField
                label="Check-out"
                icon={{ lib: 'Ionicons', name: 'calendar-outline' }}
                placeholder="Selecione a data"
                value={checkOut}
                editable={false}
                pointerEvents="none"
                style={{ paddingRight: 40}}
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={styles.iconeCampo}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.secaoHospedes}>
            <Text style={styles.rotulo}>Hóspedes</Text>
            <InputSpin
              guests={qntHospedes}
              onSelectSpin={setQntHospedes}
              minGuests={1}
              maxGuests={6}
              stepGuests={1}
              colorMaxGuests="#f80c00b7"
              colorMinGuests="#75f29297"
            />
          </View>

          <View>
            <TouchableOpacity style={{ marginTop: 16, backgroundColor: '#e3e4e6', paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}
              onPress={async () => {
                try {
                  console.log(checkIn, checkOut, qntHospedes);
                  await consulta(checkIn, checkOut, qntHospedes);
                } catch (error) {
                  console.error("Erro ao consultar quartos:", error);
                }
              }}
            >
              <Text>Consultar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listaQuartos}>
          {quartos.map((quarto) => {
            const qtd = quantidades[quarto.id] || 0;
            return (
              <View key={quarto.id} style={styles.cardQuarto}>
                <Image
                  source={quarto.imagem}
                  style={styles.imagemQuarto}
                  resizeMode="cover"
                />

                <View style={styles.detalhesQuarto}>
                  <Text style={styles.tituloQuarto} numberOfLines={1}>
                    {quarto.tipo}
                  </Text>

                  <View style={styles.linhaInfo}>
                    <Ionicons name="people-outline" size={16} color="#616161" />
                  </View>

                  <Text style={styles.infoQuarto}>Tamanho: {quarto.tamanho}</Text>

                  <View style={styles.linhaPreco}>
                    <View style={styles.controleQuantidade}>
                      <TouchableOpacity
                        style={styles.btnSpin}
                        onPress={() => atualizarQuantidade(quarto.id, -1)}
                      >
                        <Text style={styles.textoBtn}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.textoQuantidade}>{qtd}</Text>

                      <TouchableOpacity
                        style={styles.btnSpin}
                        onPress={() => atualizarQuantidade(quarto.id, 1)}
                      >
                        <Text style={styles.textoBtn}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.containerPreco}>
                      <Text style={styles.precoQuarto}>
                        R$ {quarto.preco.toFixed(2)}
                      </Text>
                      <Text style={styles.unidade}>/ noite</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.rodape}>
        <View>
          <Text style={styles.rotuloTotal}>Total</Text>
          <Text style={styles.valorTotal}>R$ {precoTotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.btnReservar}>
          <Text style={styles.textoReservar}>Reservar agora</Text>
        </TouchableOpacity>
      </View>

      {calendario && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setCalendario(null)}
        >
          <TouchableOpacity
            style={styles.overlayModal}
            activeOpacity={1}
            onPress={() => setCalendario(null)}
          >
            <View style={styles.conteudoModal}>
              <DateSelector
                onSelectDate={(data) => {
                  if (calendario === 'entrada') setCheckIn(data);
                  if (calendario === 'saida') setCheckOut(data);
                  setCalendario(null);
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  cabecalhoBusca: {
    backgroundColor: '#1565c0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tituloCabecalho: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  cardDatas: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tituloDatas: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 12,
  },
  wrapperCampo: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  iconeCampo: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -6 }],
    color: '#666',
  },
  secaoHospedes: {
    marginTop: 8,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  listaQuartos: {
    paddingHorizontal: 16,
  },
  cardQuarto: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imagemQuarto: {
    width: 90,
    height: '100%',
  },
  detalhesQuarto: {
    flex: 1,
    padding: 10,
  },
  tituloQuarto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  linhaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoQuarto: {
    fontSize: 12,
    color: '#616161',
    lineHeight: 16,
  },
  linhaPreco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  controleQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSpin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textoBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
  },
  textoQuantidade: {
    fontSize: 14,
    marginHorizontal: 10,
    color: '#212121',
    fontWeight: '500',
  },
  containerPreco: {
    alignItems: 'flex-end',
  },
  precoQuarto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ef6c00',
  },
  unidade: {
    fontSize: 11,
    color: '#757575',
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotuloTotal: {
    fontSize: 13,
    color: '#616161',
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
  },
  btnReservar: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoReservar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  overlayModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoModal: {
    backgroundColor: 'none',
    borderRadius: 16,
    width: width * 0.82,
    maxHeight: '82%',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
});

export default RenderExplorer;