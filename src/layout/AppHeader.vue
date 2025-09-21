<template>
  <header class="header">
    <div class="left">
      <div class="logo">智能财务</div>
      <nav class="nav">
        <RouterLink
          v-for="item in nav"
          :key="item.path"
          :to="item.path"
          class="link"
          active-class="active"
        >
          {{ item.title }}
        </RouterLink>
      </nav>
    </div>

    <UserPanel />
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import UserPanel from "@/components/UserPanel.vue";
import { computed } from "vue";

const user = useUserStore();
const nav = computed(() => [
  { path: '/home', title: '上传' },
  { path: '/history', title: '记录' },
  ...(user.role === 'admin'
    ? [
        { path: '/audit', title: '审核' },
        { path: '/log', title: '日志' },
      ]
    : []),
]);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}
.left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  font-size: 18px;
  font-weight: 600;
  color: #3b82f6;
}
.nav {
  display: flex;
  gap: 24px;
}
.link {
  text-decoration: none;
  color: #4b5563;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s;
}
.link:hover {
  background: #f3f4f6;
}
.active {
  background: #dbeafe;
  color: #2563eb;
}
</style>
