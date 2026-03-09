import { Ionicons } from '@expo/vector-icons';
import React, { useState, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Quarto = {
  id: number;
  nome: string;
  preco: string | number;
  qtd_cama_casal: number;
  qtd_cama_solteiro: number;
  fotos?: Array<{ url: string }>;
};

type ReservationPayload = {
  quartoId: number;
  nome: string;
  qtd_cama_casal: number;
  qtd_cama_solteiro: number;
  preco: number;
  dataInicio: string;
  dataFim: string;
  quantidade: number;
};

const RenderExplorer: React.FC = () => {
  const { consulta } = useAuth();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [qntHospedes, setQntHospedes] = useState(1);
  const [calendarioAberto, setCalendarioAberto] = useState<'entrada' | 'saida' | null>(null);
  const [quartos, setQuartos] = useState<Quarto[]>([]);
  const [quantidades, setQuantidades] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [jaConsultou, setJaConsultou] = useState(false);

  const precoTotal = useMemo(() => {
    return quartos.reduce((total, quarto) => {
      const qtd = quantidades[quarto.id] || 0;
      return total + Number(quarto.preco) * qtd;
    }, 0);
  }, [quartos, quantidades]);

  const atualizarQuantidade = (quartoId: number, delta: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [quartoId]: Math.max(0, (prev[quartoId] || 0) + delta),
    }));
  };

  const consultarDisponibilidade = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert('Atenção', 'Selecione check-in e check-out.');
      return;
    }
    setLoading(true);
    setJaConsultou(false);
    try {
      const resultado = await consulta(checkIn, checkOut, qntHospedes);
      setQuartos(resultado || []);
    } catch (err) {
      setQuartos([]);
      Alert.alert('Erro', 'Falha ao consultar quartos.');
    } finally {
      setLoading(false);
      setJaConsultou(true);
    }
  };

  const adicionarAoCarrinho = (quarto: Quarto) => {
    const qtd = quantidades[quarto.id] || 0;
    if (qtd === 0) {
      Alert.alert('Atenção', 'Escolha pelo menos 1 quarto.');
      return;
    }

    const payload: ReservationPayload = {
      quartoId: quarto.id,
      nome: quarto.nome,
      qtd_cama_casal: quarto.qtd_cama_casal,
      qtd_cama_solteiro: quarto.qtd_cama_solteiro,
      preco: Number(quarto.preco),
      dataInicio: checkIn,
      dataFim: checkOut,
      quantidade: qtd,
    };

    addReservationToCard(payload);
    Alert.alert('Adicionado!', `${qtd} × ${quarto.nome} no carrinho.`);
  };

  return (
    <AuthContainer SafeArea2={{ backgroundColor: '#f9fafb' }}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Escolher seu quarto</Text>
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.sectionTitle}>Período da estadia</Text>

          <TouchableOpacity onPress={() => setCalendarioAberto('entrada')}>
            <View style={styles.fieldWrapper}>
              <TextField
                label="Check-in"
                icon={{ lib: 'Ionicons', name: 'calendar-outline' }}
                placeholder="Data de entrada"
                value={checkIn}
                editable={false}
              />
              <Ionicons name="calendar-outline" size={20} style={styles.fieldIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCalendarioAberto('saida')}>
            <View style={styles.fieldWrapper}>
              <TextField
                label="Check-out"
                icon={{ lib: 'Ionicons', name: 'calendar-outline' }}
                placeholder="Data de saída"
                value={checkOut}
                editable={false}
              />
              <Ionicons name="calendar-outline" size={20} style={styles.fieldIcon} />
            </View>
          </TouchableOpacity>

          <View style={styles.guestsSection}>
            <Text style={styles.label}>Hóspedes</Text>
            <InputSpin
              guests={qntHospedes}
              onSelectSpin={setQntHospedes}
              minGuests={1}
              maxGuests={8}
              stepGuests={1}
              colorMaxGuests="#ef4444"
              colorMinGuests="#10b981"
            />
          </View>

          <TouchableOpacity
            style={styles.btnConsultar}
            onPress={consultarDisponibilidade}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnConsultarText}>Ver quartos disponíveis</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.roomList}>
          {loading && <ActivityIndicator size="large" color="#6b7280" style={{ marginTop: 50 }} />}

          {jaConsultou && quartos.length === 0 && !loading && (
            <Text style={styles.noResults}>Nenhum quarto disponível para este período.</Text>
          )}

          {quartos.map((quarto) => (
            <RoomCard
              key={quarto.id}
              quarto={quarto}
              quantidade={quantidades[quarto.id] || 0}
              onChangeQuantidade={atualizarQuantidade}
              onAdicionar={adicionarAoCarrinho}
            />
          ))}
        </View>
      </ScrollView>

      {calendarioAberto && (
        <Modal visible transparent animationType="fade" onRequestClose={() => setCalendarioAberto(null)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setCalendarioAberto(null)}
          >
            <View style={styles.modalContent}>
              <DateSelector
                onSelectDate={(data) => {
                  if (calendarioAberto === 'entrada') setCheckIn(data);
                  if (calendarioAberto === 'saida') setCheckOut(data);
                  setCalendarioAberto(null);
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </AuthContainer>
  );
};

interface RoomCardProps {
  quarto: Quarto;
  quantidade: number;
  onChangeQuantidade: (id: number, delta: number) => void;
  onAdicionar: (quarto: Quarto) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ quarto, quantidade, onChangeQuantidade, onAdicionar }) => {
  const podeReservar = quantidade > 0;
  const foto = quarto.fotos?.[0]?.url;

  return (
    <View style={styles.roomCard}>
      <ImageBackground
        source={foto ? { uri: foto } : require('../../../assets/images/quartos.jpg')}
        style={styles.roomImage}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.imageOverlay} />
      </ImageBackground>

      <View style={styles.roomInfo}>
        <Text style={styles.roomName} numberOfLines={1}>
          {quarto.nome}
        </Text>

        <View style={styles.bedsRow}>
          <Ionicons name="bed-outline" size={14} color="#4b5563" />
          <Text style={styles.bedsText}>
            {quarto.qtd_cama_casal} casal • {quarto.qtd_cama_solteiro} solteiro
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.btnSpin, quantidade <= 0 && styles.btnSpinDisabled]}
              onPress={() => onChangeQuantidade(quarto.id, -1)}
              disabled={quantidade <= 0}
            >
              <Text style={styles.spinText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityDisplay}>{quantidade}</Text>
            <TouchableOpacity style={styles.btnSpin} onPress={() => onChangeQuantidade(quarto.id, 1)}>
              <Text style={styles.spinText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceBlock}>
            <Text style={styles.price}>
              R$ {Number(quarto.preco).toFixed(0)}
              <Text style={styles.priceSmall}>,00</Text>
            </Text>
            <Text style={styles.priceUnit}>/ noite</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btnBook, !podeReservar && styles.btnBookDisabled]}
          onPress={() => onAdicionar(quarto)}
          disabled={!podeReservar}
        >
          <Text style={styles.btnBookText}>
            {podeReservar ? `Reservar (${quantidade})` : 'Selecionar quantidade'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f9fafb' },
  scrollContent: { paddingBottom: 90 },

  header: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  filterCard: {
    margin: 16,
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 14,
  },
  fieldWrapper: { position: 'relative', marginBottom: 14 },
  fieldIcon: {
    position: 'absolute',
    right: 14,
    top: 36,
    color: '#6b7280',
  },
  guestsSection: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  btnConsultar: {
    backgroundColor: '#111827',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnConsultarText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  roomList: { paddingHorizontal: 16 },
  noResults: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 15,
    color: '#6b7280',
  },

  roomCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.11,
    shadowRadius: 8,
    elevation: 4,
  },
  roomImage: {
    width: SCREEN_WIDTH * 0.38,     
    height: 180,                    
  },
  imageStyle: {
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  roomInfo: {
    flex: 1,
    padding: 12,                   
  },
  roomName: {
    fontSize: 16,                   
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  bedsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 5,
  },
  bedsText: {
    fontSize: 13,
    color: '#4b5563',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  btnSpin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  btnSpinDisabled: { opacity: 0.55 },
  spinText: { fontSize: 18, fontWeight: '600', color: '#374151' },
  quantityDisplay: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  priceBlock: { alignItems: 'flex-end' },
  price: {
    fontSize: 18,                   
    fontWeight: '800',
    color: '#1d4ed8',
  },
  priceSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  priceUnit: {
    fontSize: 11,
    color: '#6b7280',
  },

  btnBook: {
    backgroundColor: '#111827',
    paddingVertical: 10,            
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  btnBookDisabled: {
    backgroundColor: '#d1d5db',
  },
  btnBookText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.88,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});

export default RenderExplorer;

function addReservationToCard(_payload: ReservationPayload) {
  console.log('Adicionado ao carrinho:', _payload);
}