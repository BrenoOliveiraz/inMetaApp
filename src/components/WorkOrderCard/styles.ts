import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222"
  },

  statusBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  statusText: {
    color: "#1976D2",
    fontWeight: "600",
    fontSize: 12
  },

  description: {
    marginTop: 10,
    color: "#555",
    lineHeight: 20
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  assigned: {
    color: "#666",
    fontSize: 13
  },

  pending: {
    color: "#FF9800",
    fontWeight: "600"
  }

})