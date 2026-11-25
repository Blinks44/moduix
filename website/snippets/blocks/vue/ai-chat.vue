<script setup lang="ts">
import { SendHorizontal, Sparkles } from '@lucide/vue';
import { ref } from 'vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import styles from './ai-chat.module.css';

type Message = { id: number; role: 'assistant' | 'user'; text: string };

const suggestions = [
  'Summarize release notes',
  'Write an accessible dialog',
  'Audit contrast tokens',
];

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    text: 'Ask about components, tokens, or paste a snippet to adapt across React, Solid, Vue, and Svelte.',
  },
  {
    id: 2,
    role: 'user',
    text: 'How do I switch themes without a flash on reload?',
  },
  {
    id: 3,
    role: 'assistant',
    text: 'Set data-moduix-theme on <html> from an inline head script before hydration, then reuse the same key in your theme switcher.',
  },
]);

const prompt = ref('');

function sendMessage(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const nextId = Date.now();
  messages.value.push(
    { id: nextId, role: 'user', text: trimmed },
    {
      id: nextId + 1,
      role: 'assistant',
      text: `Drafted a plan for "${trimmed}". Connect this handler to your streaming API endpoint.`,
    },
  );
  prompt.value = '';
}
</script>

<template>
  <Card :class="styles.root">
    <CardHeader :class="styles.header">
      <div :class="styles.titleRow">
        <Sparkles aria-hidden="true" />
        <CardTitle>Design assistant</CardTitle>
      </div>
      <Badge variant="secondary">moduix-4.1</Badge>
    </CardHeader>

    <CardBody>
      <div :class="styles.messages" role="log" aria-live="polite" aria-label="Chat messages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="message.role === 'user' ? [styles.message, styles.userMessage] : styles.message"
        >
          <Avatar size="sm">
            <AvatarFallback>{{ message.role === 'user' ? 'YO' : 'AI' }}</AvatarFallback>
          </Avatar>
          <div
            :class="message.role === 'user' ? [styles.bubble, styles.userBubble] : styles.bubble"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <div :class="styles.suggestions" aria-label="Prompt suggestions">
        <Button
          v-for="item in suggestions"
          :key="item"
          size="sm"
          variant="outline"
          type="button"
          @click="sendMessage(item)"
        >
          {{ item }}
        </Button>
      </div>
    </CardBody>

    <CardFooter :class="styles.footer">
      <form :class="styles.composer" @submit.prevent="sendMessage(prompt)">
        <Textarea
          v-model="prompt"
          :rows="2"
          aria-label="Message"
          placeholder="Ask a question or paste component code…"
        />
        <div :class="styles.composerActions">
          <span :class="styles.hint">Responses are simulated in this preview.</span>
          <Button type="submit" size="sm" :disabled="!prompt.trim()">
            Send
            <SendHorizontal aria-hidden="true" />
          </Button>
        </div>
      </form>
    </CardFooter>
  </Card>
</template>