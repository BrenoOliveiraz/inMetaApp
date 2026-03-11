import Realm from "realm"

export class WorkOrderSchema extends Realm.Object {
  id!: string
  title!: string
  description!: string
  status!: string
  assignedTo!: string
  createdAt!: string
  updatedAt!: string
  completed!: boolean
  deleted!: boolean
  pendingSync!: boolean

  static schema: Realm.ObjectSchema = {
    name: "WorkOrder",
    primaryKey: "id",
    properties: {
      id: "string",
      title: "string",
      description: "string",
      status: "string",
      assignedTo: "string",
      createdAt: "string",
      updatedAt: "string",
      completed: "bool",
      deleted: "bool",
      pendingSync: { type: "bool", default: false },
    },
  }
}