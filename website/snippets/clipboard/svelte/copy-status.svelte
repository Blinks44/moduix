<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardTrigger,
    ClipboardValueText,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-copy-status.module.css';

  let copyCount = $state(0);

  function handleStatusChange(details: { copied: boolean }) {
    if (details.copied) copyCount += 1;
  }
</script>

<div class={styles.stack}>
  <Clipboard
    class={styles.root}
    defaultValue="maps-platform-token"
    onStatusChange={handleStatusChange}
  >
    <ClipboardControl>
      <ClipboardTrigger>
        <ClipboardIndicator />
        <ClipboardValueText />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
  <div data-preview-meta>
    <output>Copied {copyCount} times</output>
  </div>
</div>