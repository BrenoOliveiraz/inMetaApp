import React, { useEffect, useState } from "react"
import {
  View,
  Button,
  StyleSheet,
  Alert
} from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import {
  createWorkOrder,
  deleteWorkOrder,
  getWorkOrderById,
  orderUpdate
} from "../services/workOrderService"
import { syncWorkOrders } from "../services/syncService"
import FormInput from "../components/FormInput/FormInput"

export default function WorkOrderEditScreen() {

  const route = useRoute()
  const navigation = useNavigation()
  const params = route.params as { orderId?: string }
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")


  useEffect(() => {

    if (!params?.orderId) return

    const order = getWorkOrderById(params.orderId)

    if (order) {
      setTitle(order.title)
      setDescription(order.description)
      setAssignedTo(order.assignedTo)
    }

  }, [params?.orderId])

  
  const handleSave = async () => {

    if (!title || !description || !assignedTo) {
      Alert.alert("Atenção", "Preencha todos os campos")
      return
    }

    try {

      if (params?.orderId) {

        orderUpdate(params.orderId, {
          title,
          description,
          assignedTo
        })

      } else {

        createWorkOrder({
          title,
          description,
          assignedTo
        })

      }

      await syncWorkOrders()

      navigation.goBack()

    } catch (error) {

      console.log("Erro ao salvar:", error)

      Alert.alert("Erro", "Não foi possível salvar")

    }

  }

  const handleDelete = () => {

    Alert.alert(
      "Excluir",
      "Deseja realmente excluir esta ordem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {

            deleteWorkOrder(params.orderId!)

            await syncWorkOrders()

            navigation.goBack()

          }
        }
      ]
    )

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

      <View style={styles.buttons}>

        <Button
          title="Salvar Ordem"
          onPress={handleSave}
        />

        {params?.orderId && (

          <View style={styles.deleteButton}>
            <Button
              title="Excluir Ordem"
              color="red"
              onPress={handleDelete}
            />
          </View>

        )}

      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },

  buttons: {
    marginTop: 24
  },

  deleteButton: {
    marginTop: 12
  }

})