<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import {
    ToggleGroupItem,
    ToggleGroupRootProvider,
    useToggleGroup,
  } from '@moduix/svelte/toggle-group';

  const id = $props.id();
  const toggleGroup = useToggleGroup({ id, defaultValue: ['left'] });
  const alignmentItems = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];
</script>

<Stack align="center" gap="3">
  <ToggleGroupRootProvider value={toggleGroup} aria-label="Text alignment">
    {#each alignmentItems as item (item.value)}
      <ToggleGroupItem value={item.value}>
        {item.label}
      </ToggleGroupItem>
    {/each}
  </ToggleGroupRootProvider>
  <div data-preview-meta>
    <output>Selected: {toggleGroup().value.join(', ') || 'empty'}</output>
  </div>
</Stack>