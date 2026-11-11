<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-timeout.module.css';
</script>

<Clipboard class={styles.root} defaultValue="workspace-secret" timeout={5000}>
  <ClipboardLabel>Five second copied state</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput />
    <ClipboardTrigger>
      <ClipboardIndicator />
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>