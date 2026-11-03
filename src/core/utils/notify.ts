/**
 * Avisos y confirmaciones al usuario.
 * Por ahora usan los diálogos del navegador; si después se cambian por toasts
 * o modales, solo hay que tocar este archivo.
 */
export function notify(message: string): void {
  window.alert(message)
}

export function confirmAction(message: string): boolean {
  return window.confirm(message)
}
