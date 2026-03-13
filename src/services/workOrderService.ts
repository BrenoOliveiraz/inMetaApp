import { realm } from "../database/realm"
import uuid from "react-native-uuid"
import { WorkOrder } from "../types/WorkOrder"

// CREATE
export function createWorkOrder(data: { title: string, description: string, assignedTo: string }) {
  realm.write(() => {
    realm.create("WorkOrder", {
      id: String(uuid.v4()),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      status: "Pending",       
      completed: false,         
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pendingSync: true,       
      pendingAction: "create"   
    });
  });
}

// READ
export function getWorkOrders() {

  return realm
    .objects<WorkOrder>("WorkOrder")
    .filtered("deleted == false")
    .sorted("createdAt")

}

// UPDATE
export function orderUpdate(id: string, updates: Partial<WorkOrder>) {

  const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id)

  if (!order) {
    console.warn("WorkOrder não encontrada")
    return
  }

  realm.write(() => {

    Object.assign(order, updates)

    order.updatedAt = new Date().toISOString()

    order.pendingSync = true

    if (order.pendingAction !== "create") {
      order.pendingAction = "update"
    }

  })

}


export function deleteWorkOrder(id: string) {
  const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);

  if (order) {
    realm.write(() => {
      order.deleted = true;      
      order.pendingSync = true;  
      order.pendingAction = "delete"; 
      order.updatedAt = new Date().toISOString();
    });
  }
}


export function deleteAllWorkOrders() {
  const orders = realm.objects<WorkOrder>("WorkOrder");
  
  realm.write(() => {
    orders.forEach((order) => {
      order.deleted = true;
      order.pendingSync = true;
      order.pendingAction = "delete";
      order.updatedAt = new Date().toISOString();
    });
  });
}