import { relativeDate } from '@/core/utils'
import type { ChatMessageDto } from '../models/chat-message.model'

/** Mensajes con los que arranca el chat de soporte. */
export const chatMessagesMock: ChatMessageDto[] = [
  {
    id: 1,
    userId: 3,
    userName: 'Encargado Lab.',
    text: 'Hola, revisé la PC-08 y al parecer es la fuente de poder que no enciende.',
    sentAt: relativeDate(0, 10, 15),
  },
  {
    id: 2,
    userId: 1,
    userName: 'admin',
    text: 'Entendido. Ya solicité el componente de reemplazo con almacén.',
    sentAt: relativeDate(0, 10, 18),
  },
]

/** Respuesta automática que simula a otro participante conectado. */
export const CHAT_AUTO_REPLY = {
  message: {
    userId: 3,
    userName: 'Encargado Lab.',
    text: 'Recibido, lo reviso en un momento.',
  },
  delayMs: 1500,
} as const
