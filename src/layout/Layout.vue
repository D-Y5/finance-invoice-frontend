<template>
  <el-container direction="vertical" class="layout-container">
    <AppHeader />
    <el-main class="main-content">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/layout/AppHeader.vue'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
}
.main-content {
  padding: 24px;
  background-color: #ffffff;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>