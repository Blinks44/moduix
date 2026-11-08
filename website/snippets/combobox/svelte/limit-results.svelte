<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    Combobox,
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

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
  ].map((label) => ({ label, value: label.toLowerCase().replaceAll(' ', '-') }));
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: cities,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    limit: 5,
  });
</script>

<Combobox collection={collection()} onInputValueChange={(details) => filter(details.inputValue)}>
  <ComboboxLabel>City</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. San" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No cities found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>