<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import InfoIcon from '@lucide/svelte/icons/info';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPositioner,
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
  <SelectPositioner>
    <SelectContent>
      {#each fruits.items as item (item.value)}
        <SelectItem {item}>
          <SelectItemText><InfoIcon aria-hidden="true" />{item.label}</SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>