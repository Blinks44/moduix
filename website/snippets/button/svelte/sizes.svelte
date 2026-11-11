<script lang="ts">
  import { Star as StarIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const iconSizes = [
    { label: 'Small favorite', size: 'icon-sm' },
    { label: 'Favorite', size: 'icon-md' },
    { label: 'Large favorite', size: 'icon-lg' },
  ] as const;
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  {#each sizes as size (size)}
    <Button {size}>{size}</Button>
  {/each}
  {#each iconSizes as item (item.size)}
    <Button size={item.size} variant="outline" aria-label={item.label}>
      <StarIcon />
    </Button>
  {/each}
</Stack>