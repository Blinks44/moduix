<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@/components/clipboard';

  let rootRef = $state<HTMLElement | null>(null);
  let inputRef = $state<HTMLInputElement | null>(null);
  let triggerRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ inputRef, rootRef, triggerRef });
</script>

<Clipboard bind:ref={rootRef} defaultValue="https://moduix.dev/docs/clipboard">
  <ClipboardLabel>Copy this link</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput bind:ref={inputRef} readonly />
    <ClipboardTrigger bind:ref={triggerRef}>
      <ClipboardIndicator />
      <ClipboardIndicator>
        Copy
        {#snippet copied()}Copied!{/snippet}
      </ClipboardIndicator>
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>