<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import type { ComboboxInputValueChangeDetails } from '@ark-ui/svelte/combobox';
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
    ComboboxStatus,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
  ];
  let query = $state('');
  let items = $state.raw<typeof fruits>([]);
  let loading = $state(false);
  const collection = $derived(createListCollection({ items }));

  $effect(() => {
    const value = query;
    if (!value) {
      items = [];
      loading = false;
      return;
    }
    loading = true;
    const timeout = window.setTimeout(() => {
      items = fruits.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      loading = false;
    }, 300);
    return () => window.clearTimeout(timeout);
  });

  function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
    if (details.reason === 'input-change' || details.inputValue === '') {
      query = details.inputValue;
    }
  }
</script>

<Combobox
  {collection}
  bind:inputValue={() => query, () => {}}
  onInputValueChange={handleInputValueChange}
>
  <ComboboxLabel>Search fruit</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="Start typing" />
    <ComboboxClearTrigger aria-label="Clear search" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      {#if !query}
        <ComboboxStatus>Start typing to search…</ComboboxStatus>
      {/if}
      {#if loading}
        <ComboboxStatus>Searching…</ComboboxStatus>
      {/if}
      {#if !loading && query}
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      {/if}
      <ComboboxList>
        {#each collection.items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>