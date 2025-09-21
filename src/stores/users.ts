import { defineStore } from 'pinia'
export interface UserAccount {
  username: string
  password: string
  name: string
  role: 'user' | 'admin'
}
export const useUsersStore = defineStore('users', {
  state: (): { accounts: UserAccount[] } => ({
    accounts: [
      { username: 'u001', password: '123456', name: '张三', role: 'user' },
      { username: 'u002', password: '123456', name: '李四', role: 'user' },
      { username: 'a001', password: 'admin', name: '王会计', role: 'admin' },
    ],
  }),
  actions: {
    login(username: string, password: string): UserAccount | null {
      const found = this.accounts.find((v) => v.username === username && v.password === password)
      return found || null
    },
  },
})