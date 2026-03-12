import { realm } from "../database/realm"
import { api } from "./api"


export async function pushLocalChanges() {

  const pendingOrders = realm
    .objects("WorkOrder")
    .filtered("pendingSync == true")

  for (const order of pendingOrders) {

    try {

      if (order.pendingAction === "create") {

        await api.post("/work-orders", {
          id: order.id,
          title: order.title,
          description: order.description,
          status: order.status,
          assignedTo: order.assignedTo,
          completed: order.completed,
          deleted: order.deleted,        
          createdAt: order.createdAt,   
          updatedAt: order.updatedAt,    
        })

      }

      if (order.pendingAction === "update") {

        await api.put(`/work-orders/${order.id}`, {
          title: order.title,
          description: order.description,
          status: order.status,
          assignedTo: order.assignedTo,
          completed: order.completed,
          deleted: order.deleted,       
          createdAt: order.createdAt,   
          updatedAt: order.updatedAt,    
        })

      }

      if (order.pendingAction === "delete") {

        await api.delete(`/work-orders/${order.id}`)

      }

      realm.write(() => {
        order.pendingSync = false
        order.pendingAction = null
      })

    } catch (error) {
      console.log("Erro ao sincronizar ordem:", order.id)
    }

  }

}
