<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardTrigger,
    ClipboardValueText,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-value-text.module.css';
</script>

<Clipboard class={styles.root} defaultValue="moduix/clipboard">
  <ClipboardControl>
    <ClipboardValueText />
    <ClipboardTrigger aria-label="Copy package name">
      <ClipboardIndicator />
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>