import Realm from "realm"
import { WorkOrderSchema } from "./schemas/WorkOrderSchema"

export const realm = new Realm({
  schema: [WorkOrderSchema],
  schemaVersion: 5, 
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 5) {
     
   
    }
  },
})