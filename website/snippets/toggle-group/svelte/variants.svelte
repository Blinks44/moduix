<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';

  const items = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
  ];
</script>

<Stack align="center" gap="3">
  <ToggleGroup defaultValue={['one']} aria-label="Default variant">
    {#each items as item (item.value)}
      <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
    {/each}
  </ToggleGroup>
  <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
    {#each items as item (item.value)}
      <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
    {/each}
  </ToggleGroup>
  <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
    {#each items as item (item.value)}
      <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>
    {/each}
  </ToggleGroup>
</Stack>