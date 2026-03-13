import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { WorkOrder } from "../../types/WorkOrder"
import { styles } from "./styles"

type Props = {
  order: WorkOrder
  onPress: () => void
}

export default function WorkOrderCard({ order, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{order.title}</Text>

      <Text style={styles.description}>
        {order.description}
      </Text>

      <Text style={styles.assigned}>
        Técnico: {order.assignedTo}
      </Text>

      <Text style={styles.status}>
        Status: {order.status}
      </Text>

      {order.pendingSync && (
        <Text style={styles.pending}>
          Sincronização pendente
        </Text>
      )}
    </TouchableOpacity>
  )
}