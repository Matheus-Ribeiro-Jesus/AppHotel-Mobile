import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AuthContainer from '../ui/AuthContainer';
import TextField from '../ui/TextField';
import MaskInput, { useMaskedInputProps, Masks } from 'react-native-mask-input';

const { width } = Dimensions.get('window');

export default function AccountForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const propsTelefone = useMaskedInputProps({
    value: telefone,
    onChangeText: setTelefone,
    mask: Masks.BRL_PHONE,
  });

  const propsCpf = useMaskedInputProps({
    value: cpf,
    onChangeText: setCpf,
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  });

  const salvarDados = () => {
    if (!nome.trim() || !email.trim() || !telefone.trim() || !cpf.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  };

  const limparCamposSenha = () => {
    setSenhaAntiga('');
    setNovaSenha('');
    setConfirmarSenha('');
    setModalSenhaVisivel(false);
  };

  const alterarSenha = () => {
    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos de senha.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas novas não coincidem.');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    limparCamposSenha();
  };

  return (
    <AuthContainer
      title="Minha Conta"
      subtitle="Gerencie suas informações pessoais"
      titleColor="#0f172a"
      subtitleColor="#64748b"
      SafeArea2={{ backgroundColor: '#f8fafc' }}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.secaoTitulo}>Dados pessoais</Text>

          <View style={styles.campoWrapper}>
            <TextField
              label="Nome completo"
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              icon={{ lib: 'Ionicons', name: 'person-outline' }}
            />
          </View>

          <View style={styles.campoWrapper}>
            <TextField
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="seu@email.com"
              icon={{ lib: 'Ionicons', name: 'mail-outline' }}
            />
          </View>

          <View style={styles.campoWrapper}>
            <TextField
              {...propsTelefone}
              label="Telefone"
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              icon={{ lib: 'Ionicons', name: 'call-outline' }}
            />
          </View>

          <View style={styles.campoWrapper}>
            <TextField
              {...propsCpf}
              label="CPF"
              placeholder="000.000.000-00"
              keyboardType="numeric"
              icon={{ lib: 'Ionicons', name: 'card-outline' }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnAlterar}
            onPress={() => setModalSenhaVisivel(true)}
          >
            <Ionicons name="lock-closed-outline" size={22} color="#3b82f6" />
            <Text style={styles.textoBtnAlterar}>Alterar senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSalvar} onPress={salvarDados}>
            <Text style={styles.textoBtnSalvar}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de alteração de senha */}
      <Modal
        visible={modalSenhaVisivel}
        transparent
        animationType="fade"
        onRequestClose={limparCamposSenha}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={limparCamposSenha}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Alterar Senha</Text>
              <TouchableOpacity onPress={limparCamposSenha}>
                <Ionicons name="close-circle" size={32} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <TextField
              label="Senha atual"
              value={senhaAntiga}
              onChangeText={setSenhaAntiga}
              secureTextEntry
              icon={{ lib: 'Ionicons', name: 'lock-closed-outline' }}
            />

            <TextField
              label="Nova senha"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry
              icon={{ lib: 'Ionicons', name: 'lock-closed-outline' }}
            />

            <TextField
              label="Confirmar nova senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              icon={{ lib: 'Ionicons', name: 'lock-closed-outline' }}
            />

            <TouchableOpacity style={styles.btnConfirmarModal} onPress={alterarSenha}>
              <Text style={styles.textoConfirmarModal}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancelarModal} onPress={limparCamposSenha}>
              <Text style={styles.textoCancelarModal}>Cancelar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 28,
  },
  campoWrapper: {
    marginBottom: 20,
  },
  btnAlterar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#bae6fd',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  textoBtnAlterar: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  btnSalvar: {
    backgroundColor: '#10b981',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textoBtnSalvar: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.88,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  btnConfirmarModal: {
    backgroundColor: '#1e40af',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  textoConfirmarModal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnCancelarModal: {
    marginTop: 16,
    alignItems: 'center',
  },
  textoCancelarModal: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});