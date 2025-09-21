<template>
  <el-card shadow="hover" style="max-width: 900px; margin: 32px auto">
    <template #header>我的发票记录</template>
    <el-table :data="store.myList" style="width: 100%">
      <el-table-column prop="fileName" label="文件名" />
      <!-- 状态图标 + 文字 -->
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <div style="display: flex; align-items: center; gap: 6px">
            <el-icon :color="statusColor(row.status)" size="16">
              <CircleCheck v-if="row.status === 'approved'" />
              <CircleClose v-if="row.status === 'rejected'" />
              <Clock v-if="row.status === 'pending'" />
            </el-icon>
            <span :style="{ color: statusColor(row.status) }">
              {{
                { pending: "待审核", approved: "已通过", rejected: "已驳回" }[
                  row.status
                ]
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="驳回原因" />
      <el-table-column prop="updatedAt" label="更新时间" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { useInvoiceStore } from "@/stores/invoice";
import { Clock, CircleCheck, CircleClose } from "@element-plus/icons-vue";

const store = useInvoiceStore();

function statusColor(status: string) {
  return { pending: "#f59e0b", approved: "#10b981", rejected: "#ef4444" }[
    status
  ]!;
}
</script>
