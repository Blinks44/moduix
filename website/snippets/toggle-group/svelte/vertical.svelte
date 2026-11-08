<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';

  const viewItems = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'map', label: 'Map' },
  ];
</script>

<ToggleGroup
  defaultValue={['list']}
  orientation="vertical"
  aria-label="View mode"
  variant="outline"
>
  {#each viewItems as item (item.value)}
    <ToggleGroupItem value={item.value}>
      {item.label}
    </ToggleGroupItem>
  {/each}
</ToggleGroup>