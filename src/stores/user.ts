import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    name: '',
    role: 'user' as 'user' | 'admin',
  }),
  actions: {
    login(name: string, role: 'user' | 'admin', username: string) {
      this.name = name
      this.role = role
      this.username = username
    },
    logout() {
      this.$reset()
    },
  },
  persist: {
    key: 'finance_user',
    paths: ['username', 'name', 'role'],
    persist: true,
  },

})