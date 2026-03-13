import NetInfo from "@react-native-community/netinfo"
import { useEffect } from "react"
import { syncWorkOrders } from "../services/syncService"

export function useSync() {

  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener((state) => {

      if (state.isConnected && state.isInternetReachable) {

        syncWorkOrders()

      }

    })

    return () => unsubscribe()

  }, [])

}