import Realm from "realm"
import { api } from "./api"
import { realm } from "../database/realm"
import { pushLocalChanges } from "./pushLocalChanges"
import { useSyncStore } from "../store/syncStore"
import { WorkOrder } from "../types/WorkOrder"

export async function syncWorkOrders() {
    const DEFAULT_DATE = "1970-01-01T00:00:00.000Z"
    const { lastSync, setLastSync, setSyncing } = useSyncStore.getState()

    setSyncing(true)

    try {

        await pushLocalChanges()

        const params = lastSync ? { since: lastSync } : undefined

        const response = await api.get("/work-orders/sync", {
            params: {
                since: lastSync || DEFAULT_DATE
            }
        })

        const { created, updated, deleted } = response.data

        realm.write(() => {

            created.forEach((order: WorkOrder) => {
                realm.create(
                    "WorkOrder",
                    { ...order, pendingSync: false },
                    Realm.UpdateMode.Modified
                )
            })

            updated.forEach((order: WorkOrder) => {
                realm.create(
                    "WorkOrder",
                    { ...order, pendingSync: false },
                    Realm.UpdateMode.Modified
                )
            })

            deleted.forEach((id: string) => {

                const order = realm.objectForPrimaryKey("WorkOrder", id)

                if (order) {
                    order.deleted = true
                }

            })

        })

        setLastSync(new Date().toISOString())

    } catch (error: any) {
        console.log("Erro na sincronização:", error.response?.data || error.message)
    } finally {
        setSyncing(false)
    }
}