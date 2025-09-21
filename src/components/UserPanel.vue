<template>
  <el-dropdown @command="handleCommand">
    <span class="user-wrap">
      <el-avatar size="small" :src="avatar">{{ user.name.charAt(0) }}</el-avatar>
      <span class="name">{{ user.name }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 个人中心弹窗 -->
  <el-dialog v-model="show" title="个人中心" width="400px">
    <el-form label-width="80px">
      <el-form-item label="账号">{{ user.username }}</el-form-item>
      <el-form-item label="姓名">{{ user.name }}</el-form-item>
      <el-form-item label="部门">{{ dept }}</el-form-item>
      <el-form-item label="角色">{{ {user:'普通员工',admin:'财务管理员'}[user.role] }}</el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const user = useUserStore()
const router = useRouter()
const show = ref(false)
const dept = computed(() => (user.role === 'admin' ? '财务部' : '综合部'))

function handleCommand(cmd: string) {
  if (cmd === 'profile') show.value = true
  if (cmd === 'logout') {
    user.logout()
    router.replace('/')
    ElMessage.success('已退出')
  }
}
</script>

<style scoped>
.user-wrap{
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #303133;
}
.name{
  margin-left: 8px;
}
</style>