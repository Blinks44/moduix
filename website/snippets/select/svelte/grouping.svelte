<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectLabel,
    SelectOption,
    SelectPositioner,
  } from '@moduix/svelte/select';

  const produce = createListCollection({
    items: [
      { label: 'Apple', value: 'apple', type: 'Fruits' },
      { label: 'Mango', value: 'mango', type: 'Fruits' },
      { label: 'Orange', value: 'orange', type: 'Fruits' },
      { label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
      { label: 'Carrot', value: 'carrot', type: 'Vegetables' },
      { label: 'Spinach', value: 'spinach', type: 'Vegetables' },
    ],
    groupBy: (item) => item.type,
  });
  const groups = produce.group();
</script>

<Select collection={produce}>
  <SelectLabel>Choose produce</SelectLabel>
  <SelectField placeholder="Select item" clearLabel="Clear selection" />
  <SelectPositioner>
    <SelectContent>
      {#each groups as group (group[0])}
        <SelectItemGroup>
          <SelectItemGroupLabel>{group[0]}</SelectItemGroupLabel>
          {#each group[1] as item (item.value)}
            <SelectOption {item}>{item.label}</SelectOption>
          {/each}
        </SelectItemGroup>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>