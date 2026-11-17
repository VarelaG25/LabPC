import { onMounted, onUnmounted, ref } from 'vue'
import { SUPPORT_CHAT } from '@/core/constants'
import type { ChatMessage } from '../models/chat-message.model'
import { supportChatService } from '../services/support-chat.service'

/** ViewModel del chat de soporte en vivo. */
export function useSupportChatViewModel() {
  const messages = ref<ChatMessage[]>([])
  const draft = ref('')
  let unsubscribe: (() => void) | null = null

  function send(): void {
    const text = draft.value.trim()
    if (!text) return
    supportChatService.send(text)
    draft.value = ''
  }

  onMounted(async () => {
    messages.value = await supportChatService.connect()
    unsubscribe = supportChatService.onMessage((message) => {
      messages.value = [...messages.value, message]
    })
  })

  onUnmounted(() => {
    unsubscribe?.()
    supportChatService.disconnect()
  })

  return {
    messages,
    draft,
    roomName: SUPPORT_CHAT.roomName,
    connectionLabel: SUPPORT_CHAT.connectionLabel,
    send,
  }
}
