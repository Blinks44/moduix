<script lang="ts">
  import {
    Combobox,
    ComboboxDropdown,
    ComboboxEmpty,
    ComboboxField,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    useFilteredCollection,
  } from '@moduix/svelte/combobox';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ];

  const { collection, filter } = useFilteredCollection({
    initialItems: fruits,
  });
</script>

<Combobox collection={collection()} {filter}>
  <ComboboxLabel>Choose fruit</ComboboxLabel>
  <ComboboxField
    placeholder="e.g. Mango"
    clearLabel="Clear selection"
    triggerLabel="Open options"
  />
  <ComboboxDropdown>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {#each collection().items as item (item.value)}
        <ComboboxOption {item}>{item.label}</ComboboxOption>
      {/each}
    </ComboboxList>
  </ComboboxDropdown>
</Combobox>