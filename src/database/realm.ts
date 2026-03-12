import Realm from "realm"
import { WorkOrderSchema } from "./schemas/WorkOrderSchema"

export const realm = new Realm({
  schema: [WorkOrderSchema],
  schemaVersion: 2, 
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
     
   
    }
  },
})