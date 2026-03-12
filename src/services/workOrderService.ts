
import { realm } from '../database/realm'
import uuid from "react-native-uuid"
import { WorkOrder } from '../types/WorkOrder'


export function createWorkOrder(data: {
  title: string
  description: string
  assignedTo: string
}) {

  try {

  } catch (error) {

  }
  realm.write(() => {
    realm.create("WorkOrder", {
      id: uuid.v4(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      status: "Pending",
      completed: false,
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pendingSync: true,
      pendingAction: "create",
    })
  })
}

export function getWorkOrders() {
  return realm.objects<WorkOrder[]>("WorkOrder")
  .filtered("deleted == false")
  .sorted("createdAt")

}