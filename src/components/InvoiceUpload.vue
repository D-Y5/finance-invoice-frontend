<template>
  <el-card shadow="hover" style="max-width: 600px; margin: 32px auto;">
    <template #header>
      <div class="card-header">
        <span>上传发票</span>
        <el-tag v-if="result" :type="result.ok ? 'success' : 'danger'">
          {{ result.ok ? '检测通过' : '检测失败' }}
        </el-tag>
      </div>
    </template>

    <el-upload
      drag
      accept="image/*,application/pdf"
      :auto-upload="false"
      :on-change="handleChange"
      :show-file-list="false"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将发票拖到此处或 <em>点击上传</em>
      </div>
    </el-upload>

    <div v-if="result && !result.ok" style="margin-top: 16px;">
      <el-alert
        title="发票不符合要求"
        type="error"
        :description="result.reason"
        show-icon
        :closable="false"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from 'element-plus'
import { checkInvoice } from '@/api/mock'

const result = ref<{ ok: boolean; reason: string } | null>(null)

async function handleChange(uploadFile: UploadFile) {
  if (!uploadFile.raw) return
  result.value = await checkInvoice(uploadFile.raw)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>