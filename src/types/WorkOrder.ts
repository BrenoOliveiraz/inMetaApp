export type WorkOrder = {
  id: string
  title: string
  description: string
  status: "Pending" | "In Progress" | "Completed"
  assignedTo: string
  createdAt: string
  updatedAt: string
  completed: boolean
  deleted: boolean
  deletedAt?: string
}