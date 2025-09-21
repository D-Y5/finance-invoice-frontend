import { defineStore } from 'pinia'
import { useUserStore } from './user'
export type Status = 'pending' | 'approved' | 'rejected'
import { useLogStore } from '@/stores/log'

export interface Invoice {
  id: string
  fileName: string
  url: string
  status: Status
  reason?: string
  applicant: string // 上传人
  updatedAt: string
}

function log(item: Invoice, action: 'approved' | 'rejected', reason?: string) {
  useLogStore().add({
    invoiceId: item.id,
    fileName: item.fileName,
    operator: useUserStore().name,
    action,
    reason,
  })
}

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    list: [] as Invoice[],
  }),
  getters: {
    myList(): Invoice[] {
      const user = useUserStore()
      return this.list.filter((v) => v.applicant === user.name)
    },
    pendingList(): Invoice[] {
      return this.list.filter((v) => v.status === 'pending')
    },
  },
  actions: {
    addInvoice(file: File, url: string) {
      const user = useUserStore()
      this.list.push({
        id: Date.now().toString(),
        fileName: file.name,
        url,
        status: 'pending', // 必须是待审核
        applicant: user.name,
        updatedAt: new Date().toLocaleString(),
      })
    },
    approve(id: string) {
      const item = this.list.find(v => v.id === id)!
      if (!item) return
      item.status = 'approved'
      item.reason = ''
      item.updatedAt = new Date().toLocaleString()
      log(item, 'approved')
    },
    reject(id: string, reason: string) {
      const item = this.list.find(v => v.id === id)!
      if (!item) return
      item.status = 'rejected'
      item.reason = reason
      item.updatedAt = new Date().toLocaleString()
      log(item, 'rejected', reason)
    },
    revoke(id: string) {
      const item = this.list.find(v => v.id === id)
      if (item) {
        item.status = 'pending'
        item.reason = ''
        item.updatedAt = new Date().toLocaleString()
      }
    },
  },
  persist: true,
})