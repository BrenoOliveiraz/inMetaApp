import Realm from "realm"
import { api } from "./api"
import { realm } from "../database/realm"

export async function syncWorkOrders(lastSync?: string) {
    const response = await api.get("/work-orders/sync", {
        params: { since: lastSync },
    })
  

    const { created, updated, deleted } = response.data

    realm.write(() => {

        created.forEach((order: any) => {
            realm.create(
                "WorkOrder",
                { ...order, pendingSync: false },
                Realm.UpdateMode.Modified
            )
        })

        updated.forEach((order: any) => {
            realm.create(
                "WorkOrder",
                { ...order, pendingSync: false },
                Realm.UpdateMode.Modified
            )
        })

        deleted.forEach((id: string | number) => {
            const order = realm.objectForPrimaryKey("WorkOrder", id)

            if (order) {
                order.deleted = true
            }
        })

    })
}