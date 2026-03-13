import { realm } from "../database/realm";
import { api } from "./api";
import { WorkOrder } from "../types/WorkOrder";

export async function pushLocalChanges() {

  const pendingOrders = realm.objects<WorkOrder>("WorkOrder").filtered("pendingSync == true");

  for (const order of pendingOrders) {
    try {
      if (order.pendingAction === "create") {
        await api.post("/work-orders", {
          title: order.title,
          description: order.description,
          assignedTo: order.assignedTo,
        });
        
        realm.write(() => {
          order.pendingSync = false;
          order.pendingAction = null;
        });
      } 
      
      else if (order.pendingAction === "update") {
        await api.put(`/work-orders/${order.id}`, {
          title: order.title,
          description: order.description,
          assignedTo: order.assignedTo,
          status: order.status,
          completed: order.completed,
        });

        realm.write(() => {
          order.pendingSync = false;
          order.pendingAction = null;
        });
      } 
      else if (order.pendingAction === "delete") {

        await api.delete(`/work-orders/${order.id}`);
        
  
        realm.write(() => {
          const orderToDelete = realm.objectForPrimaryKey("WorkOrder", order.id);
          if (orderToDelete) {
            realm.delete(orderToDelete);
          }
        });
      }
    } catch (error: any) {
      console.log(`Erro ao processar ${order.pendingAction} para o ID ${order.id}:`, error.message);

    }
  }
}