<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@/components/clipboard';
</script>

<Clipboard defaultValue="server-value">
  <ClipboardLabel>Server value</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput>
      {#snippet asChild(props)}<input {...props()} readonly />{/snippet}
    </ClipboardInput>
    <ClipboardTrigger>
      {#snippet asChild(props)}
        <button {...props()} type="button">Copy server value</button>
      {/snippet}
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>