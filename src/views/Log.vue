<template>
  <el-card shadow="hover" style="max-width: 1000px; margin: 32px auto;">
    <template #header>审核日志</template>
    <el-table :data="logStore.logs" style="width: 100%">
      <el-table-column prop="timestamp" label="时间" width="160"/>
      <el-table-column prop="fileName" label="文件名"/>
      <el-table-column prop="operator" label="审核人"/>
      <el-table-column label="动作">
        <template #default="{ row }">
          <el-tag :type="{approved:'success',rejected:'danger',revoked:'info'}[row.action]">
            {{ {approved:'通过',rejected:'驳回',revoked:'撤回'}[row.action] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="原因"/>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button link type="primary" @click="revoke(row)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { useLogStore } from '@/stores/log'
import { useInvoiceStore } from '@/stores/invoice'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'


const logStore = useLogStore()
const invoiceStore = useInvoiceStore()

function revoke(row: any) {
  // 1. 把发票状态改回 pending
  invoiceStore.revoke(row.invoiceId)
  // 2. 追加一条撤回日志
  useLogStore().add({
    invoiceId: row.invoiceId,
    fileName: row.fileName,
    operator: useUserStore().name,
    action: 'revoked',
    reason: '管理员撤回',
  })
  ElMessage.success('已撤回，发票回到待审核')
}
</script>