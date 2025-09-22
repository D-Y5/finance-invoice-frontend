<template>
  <AppHeader />
  <main class="main">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
</script>

<style scoped>
.main {
  min-height: calc(100vh - 56px);
  background: #ffffff;
  padding: 24ypx;
}
</style>
