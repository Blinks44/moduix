<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-basic.module.css';
</script>

<Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
  <ClipboardLabel>Copy this link</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput />
    <ClipboardTrigger>
      <ClipboardIndicator />
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>