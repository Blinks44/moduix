<script module lang="ts">
  import { createListCollection, useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { defineMeta } from '@storybook/addon-svelte-csf';
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
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxRootProvider,
    ComboboxStatus,
    ComboboxTrigger,
    useCombobox,
  } from '@/components/combobox';
  import ComboboxPopup from './ComboboxPopup.svelte';

  const { Story } = defineMeta({
    title: 'Components/Combobox',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  type Item = { label: string; value: string };
  type GroupedItem = Item & { continent: string };

  const fruits: Item[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
  ];

  const countries: GroupedItem[] = [
    { label: 'Canada', value: 'ca', continent: 'North America' },
    { label: 'United States', value: 'us', continent: 'North America' },
    { label: 'Germany', value: 'de', continent: 'Europe' },
    { label: 'France', value: 'fr', continent: 'Europe' },
    { label: 'Japan', value: 'jp', continent: 'Asia' },
    { label: 'South Korea', value: 'kr', continent: 'Asia' },
  ];

  const jobTitles = createListCollection({
    items: [
      { label: 'Designer', value: 'designer' },
      { label: 'Developer', value: 'developer' },
      { label: 'Product Manager', value: 'product-manager' },
    ],
  });
</script>

<script lang="ts">
  const filterOptions = useFilter({ sensitivity: 'base' });
  const contains = (itemText: string, filterText: string) =>
    filterOptions().contains(itemText, filterText);

  const basic = useListCollection({ initialItems: fruits, filter: contains });
  const controlled = useListCollection({ initialItems: fruits, filter: contains });
  const grouped = useListCollection({
    initialItems: countries,
    filter: contains,
    groupBy: (item) => item.continent,
  });
  const multiple = useListCollection({ initialItems: fruits, filter: contains });

  let controlledValue = $state(['mango']);
  let multipleValue = $state<string[]>([]);
  const selectedItems = $derived(fruits.filter((item) => multipleValue.includes(item.value)));

  let inputValue = $state('');
  let loading = $state(false);
  let asyncItems = $state<Item[]>([]);
  const asyncCollection = $derived(createListCollection({ items: asyncItems }));

  $effect(() => {
    const query = inputValue;
    if (!query) {
      asyncItems = [];
      loading = false;
      return;
    }

    loading = true;
    const timeout = window.setTimeout(() => {
      asyncItems = fruits.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
      loading = false;
    }, 300);

    return () => window.clearTimeout(timeout);
  });

  const combobox = useCombobox({ collection: jobTitles });
</script>

<Story name="Basic" asChild>
  <Combobox
    collection={basic.collection()}
    onInputValueChange={(details) => basic.filter(details.inputValue)}
  >
    <ComboboxLabel>Choose fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Mango" />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPopup items={basic.collection().items} />
  </Combobox>
</Story>

<Story name="Controlled" asChild>
  <Combobox
    bind:value={controlledValue}
    collection={controlled.collection()}
    onInputValueChange={(details) => controlled.filter(details.inputValue)}
  >
    <ComboboxLabel>Choose fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPopup items={controlled.collection().items} />
  </Combobox>
</Story>

<Story name="Grouped" asChild>
  <Combobox
    collection={grouped.collection()}
    onInputValueChange={(details) => grouped.filter(details.inputValue)}
  >
    <ComboboxLabel>Country</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Canada" />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        {#each grouped.collection().group() as [continent, items] (continent)}
          <ComboboxItemGroup>
            <ComboboxItemGroupLabel>{continent}</ComboboxItemGroupLabel>
            {#each items as item (item.value)}
              <ComboboxOption {item}>{item.label}</ComboboxOption>
            {/each}
          </ComboboxItemGroup>
        {/each}
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</Story>

<Story name="Multiple" asChild>
  <Combobox
    bind:value={multipleValue}
    multiple
    collection={multiple.collection()}
    onInputValueChange={(details) => multiple.filter(details.inputValue)}
  >
    <ComboboxLabel>Fruits</ComboboxLabel>
    <div class="flex min-h-6 flex-wrap gap-1">
      {#if selectedItems.length === 0}
        <span class="inline-flex items-center rounded-sm px-2 py-1 text-xs text-muted-foreground"
          >None selected</span
        >
      {/if}
      {#each selectedItems as item (item.value)}
        <span class="inline-flex items-center rounded-sm bg-muted px-2 py-1 text-xs"
          >{item.label}</span
        >
      {/each}
    </div>
    <ComboboxControl>
      <ComboboxInput placeholder="Search fruits" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPopup items={multiple.collection().items} />
  </Combobox>
</Story>

<Story name="Async Search" exportName="AsyncSearch" asChild>
  <Combobox collection={asyncCollection} bind:inputValue>
    <ComboboxLabel>Async-style search</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="Start typing" />
      <ComboboxClearTrigger aria-label="Clear search" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        {#if !inputValue}<ComboboxStatus>Start typing to search…</ComboboxStatus>{/if}
        {#if loading}<ComboboxStatus>Searching…</ComboboxStatus>{/if}
        {#if !loading && inputValue}<ComboboxEmpty>No options found.</ComboboxEmpty>{/if}
        <ComboboxList>
          {#each asyncCollection.items as item (item.value)}
            <ComboboxOption {item}>{item.label}</ComboboxOption>
          {/each}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class="flex items-start gap-4">
    <button type="button" onclick={() => combobox().focus()}>Focus combobox</button>
    <ComboboxRootProvider value={combobox}>
      <ComboboxLabel>Job title</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPopup items={jobTitles.items} />
    </ComboboxRootProvider>
  </div>
</Story>