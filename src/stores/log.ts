import { defineStore } from 'pinia'
export interface Log {
  id: string
  invoiceId: string
  fileName: string
  operator: string // 审核人
  action: 'approved' | 'rejected'
  reason?: string
  timestamp: string
}
export const useLogStore = defineStore('log', {
  state: () => ({ logs: [] as Log[] }),
  actions: {
    add(log: Omit<Log, 'id' | 'timestamp'>) {
      this.logs.push({ ...log, id: Date.now().toString(), timestamp: new Date().toLocaleString() })
    },
  },
  action: 'approved' | 'rejected' | 'revoked',
  persist: true,
})