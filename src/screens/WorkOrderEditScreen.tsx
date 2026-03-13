import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createWorkOrder, deleteWorkOrder, orderUpdate,  } from "../services/workOrderService";
import { syncWorkOrders } from "../services/syncService";

export default function WorkOrderEditScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as { orderId?: string };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");



  const handleSave = async () => {
    try {
      if (!title || !description || !assignedTo) {
        Alert.alert("Atenção", "Preencha todos os campos");
        return;
      }

      if (params?.orderId) {
  
        orderUpdate(params.orderId, { title, description, assignedTo });
      } else {

        createWorkOrder({ title, description, assignedTo });
      }

      await syncWorkOrders();

      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  const handleDelete = () => {

    Alert.alert("Excluir", "Deseja realmente excluir esta ordem?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {

          deleteWorkOrder(params.orderId!);

          await syncWorkOrders();

          navigation.goBack();
        }
      }
    ]);

  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="Técnico"
        value={assignedTo}
        onChangeText={setAssignedTo}
        style={styles.input}
      />

      <Button title="Salvar Ordem" onPress={handleSave} />

      {params?.orderId && (
        <View style={{ marginTop: 10 }}>
          <Button title="Excluir Ordem" color="red" onPress={handleDelete} />
        </View>
      )}

    </View>
  );

}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 }
});