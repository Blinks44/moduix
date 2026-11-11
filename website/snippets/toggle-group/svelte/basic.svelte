<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';

  const alignmentItems = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];
</script>

<ToggleGroup defaultValue={['left']} aria-label="Text alignment">
  {#each alignmentItems as item (item.value)}
    <ToggleGroupItem value={item.value}>
      {item.label}
    </ToggleGroupItem>
  {/each}
</ToggleGroup>