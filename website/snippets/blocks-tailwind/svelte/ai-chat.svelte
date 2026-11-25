<script lang="ts">
  import SendHorizontal from '@lucide/svelte/icons/send-horizontal';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
  import { Textarea } from '@/components/ui/textarea';

  type Message = { id: number; role: 'assistant' | 'user'; text: string };

  const suggestions = [
    'Summarize release notes',
    'Write an accessible dialog',
    'Audit contrast tokens',
  ];

  let messages = $state<Message[]>([
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

  let prompt = $state('');

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = Date.now();
    messages = [
      ...messages,
      { id: nextId, role: 'user', text: trimmed },
      {
        id: nextId + 1,
        role: 'assistant',
        text: `Drafted a plan for "${trimmed}". Connect this handler to your streaming API endpoint.`,
      },
    ];
    prompt = '';
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    sendMessage(prompt);
  }
</script>

<Card class="flex w-[min(100%,44rem)] flex-col">
  <CardHeader class="flex flex-wrap items-center justify-between gap-3">
    <div class="flex items-center gap-2">
      <Sparkles class="size-4 text-primary" aria-hidden="true" />
      <CardTitle>Design assistant</CardTitle>
    </div>
    <Badge variant="secondary">moduix-4.1</Badge>
  </CardHeader>

  <CardBody>
    <div
      class="grid max-h-88 gap-4 overflow-y-auto py-1"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {#each messages as message (message.id)}
        <div
          class={message.role === 'user'
            ? 'flex flex-row-reverse items-start gap-3'
            : 'flex items-start gap-3'}
        >
          <Avatar size="sm">
            <AvatarFallback>{message.role === 'user' ? 'YO' : 'AI'}</AvatarFallback>
          </Avatar>
          <div
            class={message.role === 'user'
              ? 'max-w-[82%] rounded-xl border border-primary bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground'
              : 'max-w-[82%] rounded-xl border border-border bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground'}
          >
            {message.text}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-4 flex flex-wrap gap-2" aria-label="Prompt suggestions">
      {#each suggestions as item (item)}
        <Button size="sm" variant="outline" type="button" onclick={() => sendMessage(item)}>
          {item}
        </Button>
      {/each}
    </div>
  </CardBody>

  <CardFooter class="block">
    <form class="grid w-full gap-2.5" onsubmit={handleSubmit}>
      <Textarea
        rows={2}
        bind:value={prompt}
        aria-label="Message"
        placeholder="Ask a question or paste component code…"
      />
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs text-muted-foreground">Responses are simulated in this preview.</span>
        <Button type="submit" size="sm" disabled={!prompt.trim()}>
          Send
          <SendHorizontal class="size-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  </CardFooter>
</Card>