import { SendHorizontal, Sparkles } from 'lucide-solid';
import { For, createSignal } from 'solid-js';
import { Avatar, AvatarFallback } from '@/registry/solid/ui/avatar';
import { Badge } from '@/registry/solid/ui/badge';
import { Button } from '@/registry/solid/ui/button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@/registry/solid/ui/card';
import { Textarea } from '@/registry/solid/ui/textarea';
import styles from './ai-chat.module.css';

type Message = { id: number; role: 'assistant' | 'user'; text: string };

const suggestions = [
  'Summarize release notes',
  'Write an accessible dialog',
  'Audit contrast tokens',
];

const initialMessages: Message[] = [
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
];

export function AiChat() {
  const [messages, setMessages] = createSignal<Message[]>(initialMessages);
  const [prompt, setPrompt] = createSignal('');

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: nextId, role: 'user', text: trimmed },
      {
        id: nextId + 1,
        role: 'assistant',
        text: `Drafted a plan for "${trimmed}". Connect this handler to your streaming API endpoint.`,
      },
    ]);
    setPrompt('');
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    sendMessage(prompt());
  };

  return (
    <Card class={styles.root}>
      <CardHeader class={styles.header}>
        <div class={styles.titleRow}>
          <Sparkles aria-hidden="true" />
          <CardTitle>Design assistant</CardTitle>
        </div>
        <Badge variant="secondary">moduix-4.1</Badge>
      </CardHeader>

      <CardBody>
        <div class={styles.messages} role="log" aria-live="polite" aria-label="Chat messages">
          <For each={messages()}>
            {(message) => (
              <div
                class={
                  message.role === 'user'
                    ? `${styles.message} ${styles.userMessage}`
                    : styles.message
                }
              >
                <Avatar size="sm">
                  <AvatarFallback>{message.role === 'user' ? 'YO' : 'AI'}</AvatarFallback>
                </Avatar>
                <div
                  class={
                    message.role === 'user'
                      ? `${styles.bubble} ${styles.userBubble}`
                      : styles.bubble
                  }
                >
                  {message.text}
                </div>
              </div>
            )}
          </For>
        </div>

        <div class={styles.suggestions} aria-label="Prompt suggestions">
          <For each={suggestions}>
            {(item) => (
              <Button size="sm" variant="outline" type="button" onClick={() => sendMessage(item)}>
                {item}
              </Button>
            )}
          </For>
        </div>
      </CardBody>

      <CardFooter class={styles.footer}>
        <form class={styles.composer} onSubmit={handleSubmit}>
          <Textarea
            rows={2}
            value={prompt()}
            aria-label="Message"
            placeholder="Ask a question or paste component code…"
            onInput={(event) => setPrompt(event.currentTarget.value)}
          />
          <div class={styles.composerActions}>
            <span class={styles.hint}>Responses are simulated in this preview.</span>
            <Button type="submit" size="sm" disabled={!prompt().trim()}>
              Send
              <SendHorizontal aria-hidden="true" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

export default AiChat;