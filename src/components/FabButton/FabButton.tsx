import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { styles } from "./styles"


type Props = {
  onPress: () => void
}

export default function FabButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  )
}