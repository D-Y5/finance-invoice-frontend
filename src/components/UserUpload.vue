<template>
  <el-upload
    drag
    accept="image/*,application/pdf"
    :auto-upload="false"
    :on-change="handleChange"
    :show-file-list="false"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">点击或拖拽上传发票</div>
  </el-upload>

  <!-- 已上传卡片 -->
  <div v-for="item in store.myList" :key="item.id" class="invoice-card">
    <el-image :src="item.url" fit="cover" style="width: 100px; height: 100px; border-radius: 4px;"/>
    <div class="info">
      <div>{{ item.fileName }}</div>
      <el-tag :type="statusTag(item.status)">
        {{ {pending:'待审核',approved:'已通过',rejected:'已驳回'}[item.status] }}
      </el-tag>
      <div v-if="item.reason" class="reason">{{ item.reason }}</div>
    </div>
    <el-button v-if="item.status==='rejected'" link type="primary" @click="reUpload(item)">重新上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoice'

import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'

const store = useInvoiceStore()

function statusTag(status: string) {
  return status==='approved'?'success':status==='rejected'?'danger':'warning'
}

async function handleChange(uploadFile: UploadFile) {
  if (!uploadFile.raw) return
  const url = URL.createObjectURL(uploadFile.raw)
  // 只添加，不审核！
  store.addInvoice(uploadFile.raw, url)
  ElMessage.success('上传成功，请等待财务审核')
}
function reUpload(item: any) {
  // 删除旧记录
  store.list = store.list.filter((v) => v.id !== item.id)
  URL.revokeObjectURL(item.url)
}
</script>

<style scoped>
.invoice-card{
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fafafa;
}
.info{
  margin-left: 12px;
  flex: 1;
}
.reason{
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>