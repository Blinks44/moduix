<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Clipboard,
    ClipboardContext,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardRootProvider,
    ClipboardTrigger,
    ClipboardValueText,
    useClipboard,
  } from '@/components/clipboard';
  import { Input } from '@/components/input';

  const demoClassName = 'w-80';
  const stackClassName = 'grid gap-3';
  const actionClassName =
    'inline-flex min-h-control-lg cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-ring';
  const statusClassName = 'm-0 text-sm leading-5 text-muted-foreground';
  const valueTextClassName = 'flex-1';
  const copiedInputClassName =
    'data-copied:border-primary/22 data-copied:focus-visible:outline-primary';
  const copiedTriggerClassName =
    'data-copied:border-primary/22 data-copied:bg-primary/5 data-copied:text-primary data-copied:focus-visible:outline-primary';

  const { Story } = defineMeta({
    title: 'Components/Clipboard',
    component: Clipboard,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('https://ark-ui.com');
  let copyCount = $state(0);
  const clipboard = useClipboard({
    id: 'clipboard-root-provider',
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });
</script>

<Story name="Basic" asChild>
  <Clipboard class={demoClassName} defaultValue="https://moduix.dev/invite/maps">
    <ClipboardLabel>Copy this link</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClassName}>
    <Clipboard bind:value class={demoClassName}>
      <ClipboardLabel>Share URL</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
    <button class={actionClassName} type="button" onclick={() => (value = 'https://chakra-ui.com')}>
      Change URL
    </button>
  </div>
</Story>

<Story name="With Value Text" exportName="WithValueText" asChild>
  <Clipboard class={demoClassName} defaultValue="moduix/clipboard">
    <ClipboardControl>
      <ClipboardValueText class={valueTextClassName} />
      <ClipboardTrigger aria-label="Copy package name">
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Status Callback" exportName="StatusCallback" asChild>
  <Clipboard
    class={demoClassName}
    defaultValue="maps-platform-token"
    onStatusChange={(details) => {
      if (details.copied) copyCount += 1;
    }}
  >
    <ClipboardControl>
      <ClipboardTrigger>
        <ClipboardIndicator />
        <ClipboardValueText />
      </ClipboardTrigger>
    </ClipboardControl>
    <p class={statusClassName}>Copied {copyCount} times</p>
  </Clipboard>
</Story>

<Story name="Timeout" asChild>
  <Clipboard class={demoClassName} defaultValue="workspace-secret" timeout={5000}>
    <ClipboardLabel>Five second copied state</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <ClipboardRootProvider class={demoClassName} value={clipboard}>
    <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </ClipboardRootProvider>
</Story>

<Story name="Context State" exportName="ContextState" asChild>
  <Clipboard class={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
    <ClipboardControl>
      <ClipboardValueText class={valueTextClassName} />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
    <ClipboardContext>
      {#snippet render(api)}
        <p class={statusClassName}>Copied: {String(api().copied)}</p>
      {/snippet}
    </ClipboardContext>
  </Clipboard>
</Story>

<Story name="Disabled" asChild>
  <Clipboard class={demoClassName} defaultValue="workspace-secret">
    <ClipboardLabel>Disabled clipboard</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput disabled />
      <ClipboardTrigger disabled>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="As Child Bridge" exportName="AsChildBridge" asChild>
  <Clipboard class={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
    <ClipboardLabel>Use moduix Input and Button</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput>
        {#snippet asChild(props)}
          <Input {...props()} readonly />
        {/snippet}
      </ClipboardInput>
      <ClipboardTrigger>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">
            <ClipboardIndicator />
          </Button>
        {/snippet}
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Custom Copy Text" exportName="CustomCopyText" asChild>
  <Clipboard class={demoClassName} defaultValue="workspace-secret">
    <ClipboardLabel>Override copy labels</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
        <ClipboardIndicator>
          Copy secret
          {#snippet copied()}Copied!{/snippet}
        </ClipboardIndicator>
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Clipboard class={demoClassName} defaultValue="workspace-secret">
    <ClipboardLabel>Styled copied state</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly class={copiedInputClassName} />
      <ClipboardTrigger class={copiedTriggerClassName} aria-label="Copy workspace secret">
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>