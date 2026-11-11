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
  import { Stack } from '@moduix/svelte/stack';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
  let value = $state<string[]>(['mango']);
</script>

<Stack align="center" gap="3">
  <Combobox
    bind:value
    collection={collection()}
    onInputValueChange={(details) => filter(details.inputValue)}
  >
    <ComboboxLabel>Choose fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
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
  <output>Selected: {value[0] ?? 'none'}</output>
</Stack>