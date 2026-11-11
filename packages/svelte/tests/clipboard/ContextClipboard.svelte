<script lang="ts">
  import { Clipboard, ClipboardContext } from '@/components/clipboard';
  import ContextStatus from './ContextStatus.svelte';
</script>

<Clipboard defaultValue="context-value">
  <ClipboardContext>
    {#snippet render(clipboard)}
      <span>render:{clipboard().value}</span>
    {/snippet}
  </ClipboardContext>
  <ContextStatus />
</Clipboard>