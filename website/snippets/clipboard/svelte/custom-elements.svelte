<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-custom-elements.module.css';
</script>

<Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
  <ClipboardLabel>Use native input and button elements</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput>
      {#snippet asChild(props)}
        <input {...props()} readonly />
      {/snippet}
    </ClipboardInput>
    <ClipboardTrigger>
      {#snippet asChild(props)}
        <button {...props()} type="button">
          <ClipboardIndicator />
        </button>
      {/snippet}
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>