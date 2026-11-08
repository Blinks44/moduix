<script lang="ts">
  import { Kbd } from '@moduix/svelte/kbd';

  const key = {
    label: 'Esc',
    title: 'Escape',
  };
</script>

<Kbd>
  {#snippet asChild(props)}
    <kbd {...props()} title={key.title}>{key.label}</kbd>
  {/snippet}
</Kbd>