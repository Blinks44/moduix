<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Tag, TagLabel } from '@moduix/svelte/tag';

  const sizes = [
    { label: 'Compact', size: 'sm' },
    { label: 'Default', size: 'md' },
    { label: 'Large', size: 'lg' },
  ] as const;
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  {#each sizes as tag (tag.size)}
    <Tag size={tag.size}>
      <TagLabel>{tag.label}</TagLabel>
    </Tag>
  {/each}
</Stack>