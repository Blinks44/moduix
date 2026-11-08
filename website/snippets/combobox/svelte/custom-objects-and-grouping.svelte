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
    ComboboxItemGroup,
    ComboboxItemGroupLabel,
    ComboboxLabel,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';

  const countries = [
    { country: 'Canada', code: 'CA', continent: 'North America' },
    { country: 'United States', code: 'US', continent: 'North America' },
    { country: 'Germany', code: 'DE', continent: 'Europe' },
    { country: 'France', code: 'FR', continent: 'Europe' },
    { country: 'Japan', code: 'JP', continent: 'Asia' },
    { country: 'South Korea', code: 'KR', continent: 'Asia' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.continent,
  });
</script>

<Combobox collection={collection()} onInputValueChange={(details) => filter(details.inputValue)}>
  <ComboboxLabel>Country</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Canada" />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No countries found.</ComboboxEmpty>
      {#each collection().group() as [continent, items] (continent)}
        <ComboboxItemGroup>
          <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
          {#each items as item (item.code)}
            <ComboboxOption {item}>{item.country}</ComboboxOption>
          {/each}
        </ComboboxItemGroup>
      {/each}
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>