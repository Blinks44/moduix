<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Input } from '@moduix/svelte/input';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectLabel,
    SelectOption,
    SelectPositioner,
  } from '@moduix/svelte/select';
  import { Stack } from '@moduix/svelte/stack';

  const fruits = [
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
  ];
  let query = $state('');
  const collection = $derived(
    createListCollection({
      items: fruits.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }),
  );
</script>

<Stack gap="3">
  <Input bind:value={query} aria-label="Filter fruits" placeholder="Filter fruits" />
  <Select {collection}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Select an option" clearLabel="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        {#each collection.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
  </Select>
</Stack>