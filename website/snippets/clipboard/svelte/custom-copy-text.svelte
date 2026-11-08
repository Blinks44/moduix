<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';
</script>

<Clipboard class={styles.root} defaultValue="workspace-secret">
  <ClipboardLabel>Override copy labels</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput />
    <ClipboardTrigger>
      <ClipboardIndicator />
      <ClipboardIndicator>
        Copy secret
        {#snippet copied()}Copied!{/snippet}
      </ClipboardIndicator>
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>