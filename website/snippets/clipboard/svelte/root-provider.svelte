<script lang="ts">
  import {
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardRootProvider,
    ClipboardTrigger,
    useClipboard,
  } from '@moduix/svelte/clipboard';
  import styles from '@/components/examples/clipboard/component-root-provider.module.css';

  const id = $props.id();
  const clipboard = useClipboard({ id, defaultValue: 'https://moduix.dev/docs/clipboard' });
</script>

<div class={styles.stack}>
  <ClipboardRootProvider value={clipboard}>
    <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </ClipboardRootProvider>
  <output>Copied: {String(clipboard().copied)}</output>
</div>