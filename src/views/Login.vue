<template>
  <div class="login-page">
    
    <el-card class="box">
      <el-form @submit.prevent="handleLogin" label-width="60px">
        <h1 class="title">智能财务</h1>
        <el-form-item label="账号">
          <el-input v-model="username" placeholder="u001 / a001" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="password"
            type="password"
            placeholder="123456 / admin"
          />
        </el-form-item>
        <el-button native-type="submit" type="primary" style="width: 100%"
          >登录</el-button
        >
        <div class="tip">
          提示：u001/u002 为员工，a001 为财务（密码 123456 / admin）
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUsersStore } from "@/stores/users";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const username = ref("");
const password = ref("");
const usersStore = useUsersStore();
const userStore = useUserStore();
const router = useRouter();

function handleLogin() {
  const account = usersStore.login(
    username.value.trim(),
    password.value.trim()
  );
  if (!account) return ElMessage.error("账号或密码错误");
  userStore.login(account.name, account.role, account.username);
  ElMessage.success(`欢迎 ${account.name}`);
  router.push({ name: "Home" });
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}
.title {
  font-size: 48px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 32px;
  letter-spacing: 4px;
  text-align: center;
}
.box {
  width: 380px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
.tip {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
