/** Mensaje del chat de soporte. */
export interface ChatMessage {
  id: string
  author: string
  text: string
  sentAt: string
  /** `true` si lo envió el usuario actual (se alinea a la derecha). */
  isOwn: boolean
}

/**
 * Mensaje tal como lo enviará el backend por Socket.io (evento `support:message`):
 * el cliente envía `{ text }` y recibe `{ id, userId, userName, text, sentAt }`.
 */
export interface ChatMessageDto {
  id: number
  userId: number
  userName: string
  text: string
  sentAt: string
}

export function toChatMessage(dto: ChatMessageDto, currentUserId: string | null): ChatMessage {
  return {
    id: String(dto.id),
    author: dto.userName,
    text: dto.text,
    sentAt: dto.sentAt,
    isOwn: String(dto.userId) === currentUserId,
  }
}
