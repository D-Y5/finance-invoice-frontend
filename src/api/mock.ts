export interface CheckResult {
  ok: boolean
  reason: string
}

export const checkInvoice = (file: File): Promise<CheckResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const ok = Math.random() > 0.5
      resolve({
        ok,
        reason: ok ? '' : '发票号码缺失或盖章模糊',
      })
    }, 1200)
  })