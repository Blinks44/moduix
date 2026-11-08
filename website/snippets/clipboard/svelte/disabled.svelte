<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-disabled.module.css';
</script>

<Clipboard class={styles.root} defaultValue="workspace-secret">
  <ClipboardLabel>Disabled clipboard</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput disabled />
    <ClipboardTrigger disabled>
      <ClipboardIndicator />
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>