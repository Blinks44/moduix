<script lang="ts">
  import {
    Clipboard,
    ClipboardContext,
    ClipboardControl,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
    type ClipboardValueChangeDetails,
  } from '@/components/clipboard';

  let { onValueChange }: { onValueChange?: (details: ClipboardValueChangeDetails) => void } =
    $props();

  let value = $state('https://ark-ui.com');
</script>

<Clipboard bind:value {onValueChange}>
  <ClipboardLabel>Share URL</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput />
    <ClipboardTrigger aria-label="Copy share URL" />
  </ClipboardControl>
  <ClipboardContext>
    {#snippet render(clipboard)}
      <button type="button" onclick={() => clipboard().setValue('https://chakra-ui.com')}>
        Change URL
      </button>
    {/snippet}
  </ClipboardContext>
</Clipboard>
<output>{value}</output>