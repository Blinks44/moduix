<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Tag, TagLabel } from '@moduix/svelte/tag';

  const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  {#each variants as variant (variant)}
    <Tag {variant}>
      <TagLabel>{variant}</TagLabel>
    </Tag>
  {/each}
</Stack>