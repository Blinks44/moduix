'use client';

import { SendHorizontal, Sparkles } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/registry/react/ui/avatar';
import { Badge } from '@/registry/react/ui/badge';
import { Button } from '@/registry/react/ui/button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@/registry/react/ui/card';
import { Textarea } from '@/registry/react/ui/textarea';

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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [prompt, setPrompt] = useState('');

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(prompt);
  };

  return (
    <Card className="flex w-[min(100%,44rem)] flex-col">
      <CardHeader className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          <CardTitle>Design assistant</CardTitle>
        </div>
        <Badge variant="secondary">moduix-4.1</Badge>
      </CardHeader>

      <CardBody>
        <div
          className="grid max-h-88 gap-4 overflow-y-auto py-1"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'user'
                  ? 'flex flex-row-reverse items-start gap-3'
                  : 'flex items-start gap-3'
              }
            >
              <Avatar size="sm">
                <AvatarFallback>{message.role === 'user' ? 'YO' : 'AI'}</AvatarFallback>
              </Avatar>
              <div
                className={
                  message.role === 'user'
                    ? 'max-w-[82%] rounded-xl border border-primary bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground'
                    : 'max-w-[82%] rounded-xl border border-border bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground'
                }
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Prompt suggestions">
          {suggestions.map((item) => (
            <Button
              key={item}
              size="sm"
              variant="outline"
              type="button"
              onClick={() => sendMessage(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </CardBody>

      <CardFooter className="block">
        <form className="grid w-full gap-2.5" onSubmit={handleSubmit}>
          <Textarea
            rows={2}
            value={prompt}
            aria-label="Message"
            placeholder="Ask a question or paste component code…"
            onChange={(event) => setPrompt(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              Responses are simulated in this preview.
            </span>
            <Button type="submit" size="sm" disabled={!prompt.trim()}>
              Send
              <SendHorizontal className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

export default AiChat;