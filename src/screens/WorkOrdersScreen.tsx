import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { getWorkOrders } from "../services/workOrderService"

export default function WorkOrdersScreen() {
  const navigation = useNavigation()

  const orders = getWorkOrders()

  return (
    <View style={styles.container}>
      
      <FlatList
        data={[...orders]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WorkOrderForm", { orderId: item.id })
            }
          >
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.assigned}>
              Technician: {item.assignedTo}
            </Text>

            <Text style={styles.status}>
              Status: {item.status}
            </Text>

            {item.pendingSync && (
              <Text style={styles.pending}>
                Pending Sync
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("WorkOrderForm")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  },

  description: {
    marginTop: 4
  },

  assigned: {
    marginTop: 4,
    color: "#666"
  },

  status: {
    marginTop: 6,
    fontWeight: "600"
  },

  pending: {
    marginTop: 6,
    color: "orange",
    fontWeight: "bold"
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1976D2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  fabText: {
    fontSize: 30,
    color: "#fff"
  }

})