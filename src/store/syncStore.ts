import { create } from "zustand"

type SyncState = {
  syncing: boolean
  lastSync: string | null
  setSyncing: (value: boolean) => void
  setLastSync: (date: string) => void
}

export const useSyncStore = create<SyncState>((set) => ({
  syncing: false,
  lastSync: null,
  setSyncing: (value) => set({ syncing: value }),
  setLastSync: (date) => set({ lastSync: date }),
}))
