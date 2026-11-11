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
  import styles from './Clipboard.stories.module.css';

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
  <Clipboard class={styles.demo} defaultValue="https://moduix.dev/invite/maps">
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
  <div class={styles.stack}>
    <Clipboard bind:value class={styles.demo}>
      <ClipboardLabel>Share URL</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
    <button class={styles.action} type="button" onclick={() => (value = 'https://chakra-ui.com')}>
      Change URL
    </button>
  </div>
</Story>

<Story name="With Value Text" exportName="WithValueText" asChild>
  <Clipboard class={styles.demo} defaultValue="moduix/clipboard">
    <ClipboardControl>
      <ClipboardValueText class={styles.valueText} />
      <ClipboardTrigger aria-label="Copy package name">
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>

<Story name="Status Callback" exportName="StatusCallback" asChild>
  <Clipboard
    class={styles.demo}
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
    <p class={styles.status}>Copied {copyCount} times</p>
  </Clipboard>
</Story>

<Story name="Timeout" asChild>
  <Clipboard class={styles.demo} defaultValue="workspace-secret" timeout={5000}>
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
  <ClipboardRootProvider class={styles.demo} value={clipboard}>
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
  <Clipboard class={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
    <ClipboardControl>
      <ClipboardValueText class={styles.valueText} />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
    <ClipboardContext>
      {#snippet render(api)}
        <p class={styles.status}>Copied: {String(api().copied)}</p>
      {/snippet}
    </ClipboardContext>
  </Clipboard>
</Story>

<Story name="Disabled" asChild>
  <Clipboard class={styles.demo} defaultValue="workspace-secret">
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
  <Clipboard class={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
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
  <Clipboard class={styles.demo} defaultValue="workspace-secret">
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
  <Clipboard class={styles.demo} defaultValue="workspace-secret">
    <ClipboardLabel>Styled copied state</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly class={styles.customInput} />
      <ClipboardTrigger class={styles.customTrigger} aria-label="Copy workspace secret">
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</Story>