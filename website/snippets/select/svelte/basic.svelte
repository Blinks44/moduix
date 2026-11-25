<script lang="ts">
  import {
    Select,
    SelectDropdown,
    SelectField,
    SelectHiddenSelect,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectLabel,
    SelectOption,
    createListCollection,
  } from '@moduix/svelte/select';

  const fruits = createListCollection({
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
    ],
  });
</script>

<Select collection={fruits}>
  <SelectLabel>Choose fruit</SelectLabel>
  <SelectField placeholder="Select an option" clearLabel="Clear selection" />
  <SelectDropdown>
    <SelectItemGroup>
      <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
      {#each fruits.items as item (item.value)}
        <SelectOption {item}>{item.label}</SelectOption>
      {/each}
    </SelectItemGroup>
  </SelectDropdown>
  <SelectHiddenSelect />
</Select>