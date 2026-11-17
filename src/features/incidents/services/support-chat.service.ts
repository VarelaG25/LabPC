import { mockNextId } from '@/core/api'
import { getCurrentUserId, useSession } from '@/core/session/useSession'
import { CHAT_AUTO_REPLY, chatMessagesMock } from '../mocks/chat.mock'
import { toChatMessage, type ChatMessage, type ChatMessageDto } from '../models/chat-message.model'

type MessageListener = (message: ChatMessage) => void

/**
 * Chat de soporte en tiempo real.
 *
 * Por ahora es una simulación en memoria, pero con la misma interfaz que
 * tendría un cliente de Socket.io:
 *   connect()            -> io(API_URL + SOCKET_NAMESPACES.support)
 *   onMessage(listener)  -> socket.on('support:message', ...)
 *   send(text)           -> socket.emit('support:message', { text })
 *   disconnect()         -> socket.disconnect()
 *
 * Para conectarlo de verdad hace falta que el backend tenga el chat y agregar
 * la dependencia `socket.io-client`.
 */
const listeners = new Set<MessageListener>()
let replyTimer: ReturnType<typeof setTimeout> | null = null

function emit(dto: ChatMessageDto): void {
  chatMessagesMock.push(dto)
  const message = toChatMessage(dto, getCurrentUserId())
  listeners.forEach((listener) => listener(message))
}

export const supportChatService = {
  /** Historial de mensajes de la sala. */
  async connect(): Promise<ChatMessage[]> {
    const userId = getCurrentUserId()
    return chatMessagesMock.map((dto) => toChatMessage(dto, userId))
  },

  /** Avisa de cada mensaje nuevo. Devuelve una función para dejar de escuchar. */
  onMessage(listener: MessageListener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  send(text: string): void {
    const { user } = useSession()
    emit({
      id: mockNextId(chatMessagesMock),
      userId: Number(user.value?.id ?? 0),
      userName: user.value?.name ?? 'Usuario',
      text,
      sentAt: new Date().toISOString(),
    })

    // Simula la respuesta de otro participante conectado.
    if (replyTimer) clearTimeout(replyTimer)
    replyTimer = setTimeout(() => {
      emit({ id: mockNextId(chatMessagesMock), ...CHAT_AUTO_REPLY.message, sentAt: new Date().toISOString() })
    }, CHAT_AUTO_REPLY.delayMs)
  },

  disconnect(): void {
    listeners.clear()
    if (replyTimer) clearTimeout(replyTimer)
    replyTimer = null
  },
}
