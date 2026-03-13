import React, { useEffect, useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { getWorkOrders } from "../services/workOrderService"
import { useSyncStore } from "../store/syncStore"
import { WorkOrder } from "../types/WorkOrder"

import SyncBanner from "../components/SyncBanner/SyncBanner"
import WorkOrderCard from "../components/WorkOrderCard/WorkOrderCard"
import FabButton from "../components/FabButton/FabButton"
import DeleteAllOrdersButton from "../components/DeleteAllOrdersButton/DeleteAllOrdersButton"

export default function WorkOrdersScreen() {
  const navigation = useNavigation()
  const isSyncing = useSyncStore((state) => state.syncing)
  const [orders, setOrders] = useState<WorkOrder[]>([])

useEffect(() => {

  const results = getWorkOrders()

  const mapOrders = () => {
    const data = results.map(order => ({ ...order }))
    setOrders(data)
  }

  mapOrders()

  const listener = () => {
    mapOrders()
  }

  results.addListener(listener)

  return () => {
    results.removeListener(listener)
  }

}, [])

  return (
    <View style={styles.container}>

      {/* <DeleteAllOrdersButton /> */}

      {isSyncing && <SyncBanner />}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkOrderCard
            order={item}
            onPress={() =>
              navigation.navigate("WorkOrderEditScreen", { orderId: item.id })
            }
          />
        )}
      />

      <FabButton
        onPress={() => navigation.navigate("WorkOrderForm")}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
 
})