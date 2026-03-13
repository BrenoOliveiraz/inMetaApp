import React from "react"
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import { deleteAllWorkOrders } from "../../services/workOrderService"


export default function DeleteAllOrdersButton() {

  function handleDelete() {
    Alert.alert(
      "Excluir tudo",
      "Tem certeza que deseja deletar todas as ordens?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteAllWorkOrders()
        }
      ]
    )
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Text style={styles.text}>Deletar todas</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
})