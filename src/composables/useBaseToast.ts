import { useToast } from 'primevue/usetoast'

export type ToastOptions = {
  group?: string
  severity?: 'success' | 'info' | 'warn' | 'error'
  summary?: string
  message?: string
  duration?: number
}

export default function useBaseToast() {
  const toast = useToast()

  function showToast({
    group = undefined,
    severity,
    summary,
    message,
    duration = 3000
  }: ToastOptions): void {
    toast.add({
      group,
      severity,
      summary,
      detail: message,
      life: duration
    })
  }

  function info(params: ToastOptions): void {
    showToast({ ...params, severity: 'info', summary: 'Info' })
  }

  function warn(params: ToastOptions): void {
    showToast({ ...params, severity: 'warn', summary: 'Warning' })
  }

  function error(params: ToastOptions): void {
    params.message = params.message || 'An error occurred'
    showToast({ ...params, severity: 'error', summary: 'Error' })
  }

  function success(params: ToastOptions): void {
    params.message = params.message || 'Operation successful'
    showToast({ ...params, severity: 'success', summary: 'Success' })
  }

  return { info, warn, success, error }
}
