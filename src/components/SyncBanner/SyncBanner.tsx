import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { styles } from "./styles"


export default function SyncBanner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#fff" size="small" />

      <Text style={styles.text}>
        Sincronizando com servidor...
      </Text>
    </View>
  )
}