<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';

  const sizes = ['xs', 'sm', 'md', 'lg'] as const;
  const alignmentItems = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];
</script>

<Stack align="center" gap="3">
  {#each sizes as size (size)}
    <ToggleGroup {size} defaultValue={['left']} aria-label={`Text alignment, ${size}`}>
      {#each alignmentItems as item (item.value)}
        <ToggleGroupItem value={item.value}>
          {item.label}
        </ToggleGroupItem>
      {/each}
    </ToggleGroup>
  {/each}
</Stack>