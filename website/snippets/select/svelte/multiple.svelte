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

  const languages = createListCollection({
    items: [
      { label: 'C#', value: 'csharp' },
      { label: 'Go', value: 'go' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'Python', value: 'python' },
      { label: 'Rust', value: 'rust' },
      { label: 'TypeScript', value: 'typescript' },
    ],
  });
</script>

<Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
  <SelectLabel>Languages</SelectLabel>
  <SelectControl>
    <SelectTrigger><SelectValueText placeholder="Select languages" /></SelectTrigger>
    <SelectIndicator />
    <SelectClearTrigger aria-label="Clear selection" />
  </SelectControl>
  <SelectPositioner>
    <SelectContent>
      {#each languages.items as item (item.value)}
        <SelectOption {item}>{item.label}</SelectOption>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>