<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack gap="3">
  {#snippet asChild(props)}
    <section {...props()}>
      <h3>Rendered as section</h3>
      <p>Use asChild when the layout wrapper should also carry document semantics.</p>
    </section>
  {/snippet}
</Stack>