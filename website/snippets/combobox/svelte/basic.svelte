<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    Combobox,
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxControl,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
</script>

<Combobox collection={collection()} onInputValueChange={(details) => filter(details.inputValue)}>
  <ComboboxLabel>Choose fruit</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Mango" />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>