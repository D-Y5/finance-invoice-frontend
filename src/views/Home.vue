<template>
  <!-- 移除多余的 Layout 嵌套，因为路由已处理布局 -->
  <div style="max-width: 600px; margin: 32px auto;">
    <UserUpload />
  </div>
</template>

<script setup lang="ts">
import UserUpload from '@/components/UserUpload.vue'
</script>