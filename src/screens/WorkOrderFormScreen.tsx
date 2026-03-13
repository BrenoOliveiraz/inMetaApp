import React, { useState } from "react"
import {
  View,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { createWorkOrder } from "../services/workOrderService"
import { syncWorkOrders } from "../services/syncService"
import FormInput from "../components/FormInput/FormInput"
import PrimaryButton from "../components/PrimaryButton/PrimaryButton"

export default function WorkOrderFormScreen() {

  const navigation = useNavigation()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [loading, setLoading] = useState(false)

  function handleBack() {
    navigation.goBack()
  }

  async function handleSave() {

    if (!title || !description || !assignedTo) {
      Alert.alert("Atenção", "Preencha todos os campos")
      return
    }

    try {

      setLoading(true)

      await createWorkOrder({
        title,
        description,
        assignedTo
      })

      Alert.alert("Chamado", "Chamado cadastrado com sucesso")

      await syncWorkOrders()

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

      <FormInput
        label="Título"
        value={title}
        onChangeText={setTitle}
      />

      <FormInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <FormInput
        label="Técnico"
        value={assignedTo}
        onChangeText={setAssignedTo}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <PrimaryButton
            title="Salvar Ticket"
            onPress={handleSave}
            loading={loading}
          />
        )}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },

  buttonContainer: {
    marginTop: 24
  }

})