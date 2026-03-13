import React from "react"
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { styles } from "./styles"


type Props = {
  title: string
  onPress: () => void
  loading?: boolean
}

export default function PrimaryButton({
  title,
  onPress,
  loading
}: Props) {

  return (

    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >

      {loading
        ? <ActivityIndicator color="#fff"/>
        : <Text style={styles.text}>{title}</Text>
      }

    </TouchableOpacity>

  )

}