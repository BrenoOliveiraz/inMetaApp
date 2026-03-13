import React from "react"
import { TouchableOpacity, Text, View } from "react-native"
import { WorkOrder } from "../../types/WorkOrder"
import { styles } from "./styles"

type Props = {
  order: WorkOrder
  onPress: () => void
}

export default function WorkOrderCard({ order, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>

      <View style={styles.header}>
        <Text style={styles.title}>{order.title}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <Text style={styles.description}>{order.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.assigned}>👨‍🔧 {order.assignedTo}</Text>

        {order.pendingSync && (
          <Text style={styles.pending}>⏳ Pendente</Text>
        )}
      </View>

    </TouchableOpacity>
  )
}