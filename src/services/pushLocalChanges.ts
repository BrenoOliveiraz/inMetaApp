import { realm } from "../database/realm";
import { api } from "../api/api";
import { WorkOrder } from "../types/WorkOrder";
import Realm from "realm"

export async function pushLocalChanges() {

  const pendingOrders = [...realm
    .objects<WorkOrder>("WorkOrder")
    .filtered("pendingSync == true")]

  for (const order of pendingOrders) {

    try {

      if (order.pendingAction === "create") {

        const response = await api.post("/work-orders", {
          title: order.title,
          description: order.description,
          assignedTo: order.assignedTo,
        })

        const serverOrder = response.data

        realm.write(() => {

          realm.create(
            "WorkOrder",
            {
              ...serverOrder,
              pendingSync: false,
              pendingAction: null
            },
            Realm.UpdateMode.Modified
          )

          const orderToDelete = realm.objectForPrimaryKey("WorkOrder", order.id)

          if (orderToDelete) {
            realm.delete(orderToDelete)
          }

        })

      }

      else if (order.pendingAction === "update") {

        await api.put(`/work-orders/${order.id}`, {
          title: order.title,
          description: order.description,
          assignedTo: order.assignedTo,
          status: order.status,
          completed: order.completed,
        })

        realm.write(() => {

          const orderToUpdate = realm.objectForPrimaryKey("WorkOrder", order.id)

          if (orderToUpdate) {
            orderToUpdate.pendingSync = false
            orderToUpdate.pendingAction = null
          }

        })

      }

      else if (order.pendingAction === "delete") {

        await api.delete(`/work-orders/${order.id}`)

        realm.write(() => {

          const orderToDelete = realm.objectForPrimaryKey("WorkOrder", order.id)

          if (orderToDelete) {
            realm.delete(orderToDelete)
          }

        })

      }

    } catch (error: any) {

      console.log(
        `Erro ao processar ${order.pendingAction} para o ID ${order.id}:`,
        error.message
      )

    }

  }

}