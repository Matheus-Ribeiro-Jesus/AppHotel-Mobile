import { Dimensions, TouchableOpacity, View, Modal, Text, Alert } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import React, { useState } from "react";
import MaskInput, { useMaskedInputProps, Masks } from "react-native-mask-input";

export default function AccountForm() {
  const { width, height } = Dimensions.get("window");

  // Estados do formulário principal
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  // Estados do modal de alteração de senha
  const [exibirModalSenha, setExibirModalSenha] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Máscaras para telefone e CPF
  const propsTelefone = useMaskedInputProps({
    value: telefone,
    onChangeText: setTelefone,
    mask: Masks.BRL_PHONE,
  });

  const propsCpf = useMaskedInputProps({
    value: cpf,
    onChangeText: setCpf,
    mask: [
      /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/
    ],
  });

  const salvarDados = () => {
    if (!nome.trim() || !email.trim() || !telefone.trim() || !cpf.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos antes de salvar!");
      return;
    }
  };

  return (
    <AuthContainer
      titleColor="black"
      subtitleColor="black"
      SafeArea2={{ backgroundColor: "#fffefe" }}
      title="Minha conta"
      subtitle="Por favor insira seus novos dados"
    >
      <View style={{ width: "90%", left: width * 0.05 }}>
        <TextField
          label="Nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={{ width: "90%", left: width * 0.05 }}>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={{ width: "90%", left: width * 0.05 }}>
        <TextField
          {...propsTelefone}
          label="Telefone"
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ width: "90%", left: width * 0.05 }}>
        <TextField
          {...propsCpf}
          label="CPF"
          placeholder="000.000.000-00"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        onPress={() => setExibirModalSenha(true)}
        style={{
          marginTop: 24,
          width: "80%",
          height: 48,
          justifyContent: "center",
          backgroundColor: "#007AFF",
          borderRadius: 20,
          left: width * 0.1,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Alterar Senha
        </Text>
      </TouchableOpacity>

      {/* Novo botão: Salvar Dados */}
      <TouchableOpacity
        onPress={salvarDados}
        style={{
          marginTop: 16,
          width: "80%",
          height: 48,
          justifyContent: "center",
          backgroundColor: "#4CAF50", // verde para diferenciar
          borderRadius: 20,
          left: width * 0.1,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Salvar Dados
        </Text>
      </TouchableOpacity>

      {/* Modal de senha (mantido igual) */}
      {exibirModalSenha && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setExibirModalSenha(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setExibirModalSenha(false)}
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={{
                width: "86%",
                maxWidth: 400,
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 26,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Alterar Senha
              </Text>

              <TextField
                label="Senha antiga"
                value={senhaAntiga}
                onChangeText={setSenhaAntiga}
                secureTextEntry
                style={{height: 45}}
              />

              <TextField
                label="Nova senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
                style={{height: 45}}
              />

              <TextField
                label="Confirme a nova senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                style={{height: 45}}
              />

              <TouchableOpacity
                onPress={() => {
                  if (!senhaAntiga || !novaSenha || !confirmarSenha) {
                    alert("Preencha todos os campos!");
                    return;
                  }
                  if (novaSenha !== confirmarSenha) {
                    alert("As senhas novas não coincidem!");
                    return;
                  }
                  if (novaSenha.length < 6) {
                    alert("A nova senha deve ter pelo menos 6 caracteres!");
                    return;
                  }

                  console.log("Alterando senha:", { senhaAntiga, novaSenha });

                  setSenhaAntiga("");
                  setNovaSenha("");
                  setConfirmarSenha("");
                  setExibirModalSenha(false);
                  alert("Senha alterada com sucesso!"); 
                }}
                style={{
                  backgroundColor: "#007AFF",
                  paddingVertical: 14,
                  borderRadius: 8,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                  Salvar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  setExibirModalSenha(false);
                  setSenhaAntiga("");
                  setNovaSenha("");
                  setConfirmarSenha("");
                }}
              >
                <Text style={{ color: "#007AFF", fontSize: 16, textAlign: "center" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </AuthContainer>
  );
}