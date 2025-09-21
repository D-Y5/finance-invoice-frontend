<template>
  <el-card shadow="hover" style="max-width: 900px; margin: 32px auto;">
    <template #header>待审核发票</template>

    <el-table :data="store.pendingList" style="width: 100%" @selection-change="selChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="fileName" label="文件名" />
      <el-table-column prop="applicant" label="申请人" />
      <el-table-column label="预览" width="100">
        <template #default="{ row }">
          <el-image
            :src="row.url"
            :preview-src-list="[row.url]"
            fit="cover"
            style="width: 64px; height: 64px; border-radius: 4px; cursor: pointer;"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" type="success" @click="pass(row.id)">通过</el-button>
          <el-button size="small" type="danger"  @click="openReject(row.id)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 批量通过 -->
    <div style="margin-top: 16px;">
      <el-button :disabled="selected.length === 0" type="success" @click="batchApprove">批量通过</el-button>
    </div>
  </el-card>

  <!-- 驳回弹窗 -->
  <el-dialog v-model="rejectVisible" title="驳回发票" width="400px">
    <el-form>
      <el-form-item label="驳回原因">
        <el-input
          v-model="rejectReason"
          type="textarea"
          :rows="3"
          placeholder="请输入驳回原因，例如：发票号码缺失、盖章模糊等"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="rejectVisible = false">取消</el-button>
      <el-button type="danger" @click="confirmReject">确定驳回</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInvoiceStore } from '@/stores/invoice'
import { ElMessage } from 'element-plus'
import type { Invoice } from '@/stores/invoice'

const store = useInvoiceStore()
const selected = ref<Invoice[]>([])

// 驳回弹窗状态
const rejectVisible = ref(false)
const rejectId = ref('')
const rejectReason = ref('')

function selChange(rows: Invoice[]) {
  selected.value = rows
}

function pass(id: string) {
  store.approve(id)
  ElMessage.success('已通过')
}

function openReject(id: string) {
  rejectId.value = id
  rejectReason.value = ''
  rejectVisible.value = true
}

function confirmReject() {
  if (!rejectReason.value.trim()) {
    ElMessage.warning('请输入驳回原因')
    return
  }
  store.reject(rejectId.value, rejectReason.value.trim())
  rejectVisible.value = false
  ElMessage.success('已驳回')
}

function batchApprove() {
  selected.value.forEach((row) => store.approve(row.id))
  ElMessage.success(`已批量通过 ${selected.value.length} 张发票`)
}
</script>