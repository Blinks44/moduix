<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    Combobox,
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
  import styles from '@/components/examples/combobox/component-multiple.module.css';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
  let value = $state<string[]>([]);
  const selectedItems = $derived(fruits.filter((item) => value.includes(item.value)));
</script>

<Combobox
  bind:value
  collection={collection()}
  multiple
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Fruits</ComboboxLabel>
  <div class={styles.tags}>
    {#if selectedItems.length === 0}
      <span class={styles.note}>None selected</span>
    {/if}
    {#each selectedItems as item (item.value)}
      <span class={styles.tag}>{item.label}</span>
    {/each}
  </div>
  <ComboboxControl>
    <ComboboxInput placeholder="Search fruits" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>