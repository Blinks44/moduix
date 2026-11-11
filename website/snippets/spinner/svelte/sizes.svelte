<script lang="ts">
  import { Spinner } from '@moduix/svelte/spinner';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<Stack direction="row" align="center" gap="4">
  {#each sizes as size (size)}
    <Spinner decorative {size} />
  {/each}
</Stack>