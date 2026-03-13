import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
  }
})