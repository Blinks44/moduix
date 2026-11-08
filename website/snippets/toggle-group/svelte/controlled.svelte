<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';

  let value = $state<string[]>(['left']);
  const alignmentItems = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];
</script>

<Stack align="center" gap="3">
  <ToggleGroup bind:value aria-label="Text alignment">
    {#each alignmentItems as item (item.value)}
      <ToggleGroupItem value={item.value}>
        {item.label}
      </ToggleGroupItem>
    {/each}
  </ToggleGroup>
  <div data-preview-meta>
    <output>Selected: {value.join(', ') || 'empty'}</output>
  </div>
</Stack>