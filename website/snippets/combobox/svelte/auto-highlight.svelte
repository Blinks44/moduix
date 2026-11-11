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

  const departments = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Finance', value: 'finance' },
    { label: 'Human Resources', value: 'human-resources' },
    { label: 'Operations', value: 'operations' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: departments,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
</script>

<Combobox
  collection={collection()}
  inputBehavior="autohighlight"
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Department</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Engineering" />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No departments found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>