<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectClearTrigger,
    SelectContent,
    SelectControl,
    SelectIndicator,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';

  const fruits = createListCollection({
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
      { label: 'Grape', value: 'grape' },
      { label: 'Kiwi', value: 'kiwi' },
      { label: 'Mango', value: 'mango' },
      { label: 'Orange', value: 'orange' },
      { label: 'Pineapple', value: 'pineapple' },
      { label: 'Strawberry', value: 'strawberry' },
      { label: 'Watermelon', value: 'watermelon' },
    ],
  });
</script>

<Select collection={fruits} lazyMount unmountOnExit>
  <SelectLabel>Choose fruit</SelectLabel>
  <SelectControl>
    <SelectTrigger><SelectValueText placeholder="Select an option" /></SelectTrigger>
    <SelectIndicator />
    <SelectClearTrigger aria-label="Clear selection" />
  </SelectControl>
  <SelectPositioner>
    <SelectContent>
      {#each fruits.items as item (item.value)}
        <SelectOption {item}>{item.label}</SelectOption>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>