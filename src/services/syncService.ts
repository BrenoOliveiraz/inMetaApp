import Realm from "realm"
import { api } from "./api"
import { realm } from "../database/realm"
import { pushLocalChanges } from "./pushLocalChanges"
import { useSyncStore } from "../store/syncStore"
import { WorkOrder } from "../types/WorkOrder"

export async function syncWorkOrders() {
    const { lastSync, setLastSync, setSyncing } = useSyncStore.getState()
    setSyncing(true)

    try {
       
        await pushLocalChanges()

        const response = await api.get("/work-orders/sync", {
            params: { since: lastSync },
        })

        const { created, updated, deleted } = response.data

        realm.write(() => {
            created.forEach((order: WorkOrder) =>
                realm.create("WorkOrder", { ...order, pendingSync: false }, Realm.UpdateMode.Modified)
            )

            updated.forEach((order: WorkOrder) =>
                realm.create("WorkOrder", { ...order, pendingSync: false }, Realm.UpdateMode.Modified)
            )
            
            deleted.forEach((id: any) => {
                const order = realm.objectForPrimaryKey("WorkOrder", id)
                if (order) order.deleted = true
            })
        })

        setLastSync(new Date().toISOString())

    } catch (error) {
      
        console.log("Sincronização falhou (provavelmente offline):", error.message)
    } finally {
        setSyncing(false)
    }
}