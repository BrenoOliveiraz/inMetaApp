import {realm} from '../database/realm'
import uuid from "react-native-uuid"

export function createWorkOrder(data: {
  title: string
  description: string
  assignedTo: string
}) {
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
    })
  })
}