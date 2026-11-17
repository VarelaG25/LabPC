<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import AppIcon from '@/core/components/AppIcon.vue'
import { formatDateTime } from '@/core/utils'
import type { ChatMessage } from '../models/chat-message.model'

const props = defineProps<{
  messages: ChatMessage[]
  roomName: string
  connectionLabel: string
}>()

const draft = defineModel<string>('draft', { required: true })
defineEmits<{ send: [] }>()

const messagesBox = ref<HTMLElement | null>(null)

// Mantiene visible el último mensaje.
watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    messagesBox.value?.scrollTo({ top: messagesBox.value.scrollHeight, behavior: 'smooth' })
  },
)
</script>

<template>
  <section class="chat">
    <header class="chat-header">
      <div class="title">
        <AppIcon name="message" :size="18" />
        <h3>
          Chat de Soporte en Vivo
          <span class="connection"><span class="pulse-dot"></span> {{ connectionLabel }}</span>
        </h3>
      </div>
      <span class="room">Sala: {{ roomName }}</span>
    </header>

    <div ref="messagesBox" class="messages" aria-live="polite">
      <div v-for="message in messages" :key="message.id" class="message" :class="message.isOwn ? 'outgoing' : 'incoming'">
        <span class="author">{{ message.author }}</span>
        <p>{{ message.text }}</p>
        <span class="time">{{ formatDateTime(message.sentAt) }}</span>
      </div>
    </div>

    <form class="input-area" @submit.prevent="$emit('send')">
      <label class="sr-only" for="chat-input">Mensaje</label>
      <input id="chat-input" v-model="draft" type="text" placeholder="Escribe un mensaje en tiempo real..." />
      <button type="submit" class="send" aria-label="Enviar mensaje">
        <AppIcon name="send" :size="16" />
      </button>
    </form>
  </section>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--color-neutral-border);
  border-radius: var(--radius-lg);
  background: #f8fafc;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-neutral-border);
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1e293b;
}

.title h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
}

.connection {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 12px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 11px;
  font-weight: 500;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0284c7;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(2, 132, 199, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
}

.room {
  color: var(--color-text-subtle);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 180px;
  padding: 12px;
  overflow-y: auto;
  border: 1px solid var(--color-neutral-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.message {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 75%;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.message.incoming {
  align-self: flex-start;
  background: #f1f5f9;
  color: #334155;
}

.message.outgoing {
  align-self: flex-end;
  background: #e0e7ff;
  color: #312e81;
}

.author {
  font-size: 10px;
  font-weight: 700;
  opacity: 0.8;
}

.time {
  align-self: flex-end;
  font-size: 9px;
  opacity: 0.6;
}

.input-area {
  display: flex;
  gap: 8px;
}

.input-area input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-md);
  outline: none;
  background: var(--color-surface);
  font-size: var(--font-size-sm);
}

.input-area input:focus {
  border-color: var(--color-primary);
}

.send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #ffffff;
  transition: background var(--transition);
}

.send:hover {
  background: var(--color-primary-hover);
}

@media (max-width: 768px) {
  .chat-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
