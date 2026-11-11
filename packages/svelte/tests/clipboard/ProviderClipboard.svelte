<script lang="ts">
  import {
    ClipboardControl,
    ClipboardInput,
    ClipboardLabel,
    ClipboardRootProvider,
    ClipboardTrigger,
    useClipboard,
  } from '@/components/clipboard';

  const clipboard = useClipboard({ id: 'provider-clipboard', defaultValue: 'provider-value' });
</script>

<ClipboardRootProvider value={clipboard}>
  <ClipboardLabel>Provider value</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput>
      {#snippet asChild(props)}<input {...props()} readonly />{/snippet}
    </ClipboardInput>
    <ClipboardTrigger>
      {#snippet asChild(props)}
        <button {...props()} type="button">Copy provider value</button>
      {/snippet}
    </ClipboardTrigger>
  </ClipboardControl>
</ClipboardRootProvider>