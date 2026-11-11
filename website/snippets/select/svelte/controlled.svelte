<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectClearTrigger,
    SelectContent,
    SelectControl,
    SelectIndicator,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';

  const themes = createListCollection({
    items: [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  });
  let value = $state(['light']);
</script>

<Select bind:value collection={themes}>
  <SelectLabel>Theme</SelectLabel>
  <SelectControl>
    <SelectTrigger><SelectValueText placeholder="Select theme" /></SelectTrigger>
    <SelectIndicator />
    <SelectClearTrigger aria-label="Clear selection" />
  </SelectControl>
  <SelectPositioner>
    <SelectContent>
      {#each themes.items as item (item.value)}
        <SelectOption {item}>{item.label}</SelectOption>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>