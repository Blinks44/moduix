<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@moduix/svelte/clipboard';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/clipboard/component-custom-elements.module.css';
</script>

<Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
  <ClipboardLabel>Reuse moduix Input and Button</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput>
      {#snippet asChild(props)}
        <Input {...props()} readonly />
      {/snippet}
    </ClipboardInput>
    <ClipboardTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          <ClipboardIndicator />
        </Button>
      {/snippet}
    </ClipboardTrigger>
  </ClipboardControl>
</Clipboard>