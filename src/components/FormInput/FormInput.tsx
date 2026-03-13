import React from "react"
import { View, Text, TextInput } from "react-native"
import { styles } from "./styles"

type Props = {
  label: string
  value: string
  onChangeText: (text: string) => void
}

export default function FormInput({
  label,
  value,
  onChangeText
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Digite ${label.toLowerCase()}`}
        placeholderTextColor="#999"
      />

    </View>
  )

}