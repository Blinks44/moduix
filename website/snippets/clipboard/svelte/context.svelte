<script lang="ts">
  import {
    Clipboard,
    ClipboardContext,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardTrigger,
    ClipboardValueText,
  } from '@moduix/svelte/clipboard';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/clipboard/component-context.module.css';
</script>

<Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
  <ClipboardControl>
    <ClipboardValueText />
    <ClipboardTrigger>
      <ClipboardIndicator />
    </ClipboardTrigger>
  </ClipboardControl>
  <ClipboardContext>
    {#snippet render(clipboard)}
      <Stack align="center" gap="2">
        <output>Copied: {String(clipboard().copied)}</output>
      </Stack>
    {/snippet}
  </ClipboardContext>
</Clipboard>