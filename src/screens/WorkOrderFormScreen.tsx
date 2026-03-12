import React, { useState } from "react"
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert
} from "react-native"

import { ActivityIndicator } from "react-native"

import { createWorkOrder } from "../services/workOrderService"
import { useNavigation } from "@react-navigation/native"

export default function WorkOrderFormScreen() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  async function handleSave() {

    try {

      setLoading(true)

      await createWorkOrder({
        title,
        description,
        assignedTo
      })

      Alert.alert("Chamado", "Chamado cadastrado com sucesso")

      handleBack()

    } catch (error) {

      console.log(error)
      Alert.alert("Erro", "Não foi possível salvar")

    } finally {

      setLoading(false)

    }

  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Técnico</Text>
      <TextInput
        style={styles.input}
        value={assignedTo}
        onChangeText={setAssignedTo}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Salvar Ticket" onPress={handleSave} />
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },

  label: {
    marginTop: 16,
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginTop: 6
  }

})