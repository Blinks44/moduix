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

  const seaCreatures = [
    { label: 'Whale', value: 'whale' },
    { label: 'Dolphin', value: 'dolphin' },
    { label: 'Shark', value: 'shark' },
    { label: 'Octopus', value: 'octopus' },
    { label: 'Jellyfish', value: 'jellyfish' },
    { label: 'Seahorse', value: 'seahorse' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: seaCreatures,
    filter: (itemText, filterText) => filterOptions().startsWith(itemText, filterText),
  });
</script>

<Combobox
  collection={collection()}
  inputBehavior="autocomplete"
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Sea creature</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Dolphin" />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No creatures found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>