<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxEmpty,
    ListboxInput,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const frameworks = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Next.js', value: 'nextjs' },
  ];
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
  });
  const updateFilter = (event: Event) => filter((event.target as HTMLInputElement).value);
</script>

<Listbox collection={collection()} typeahead={false}>
  <ListboxLabel>Select framework</ListboxLabel>
  <ListboxInput placeholder="Filter frameworks" oninput={updateFilter} />
  <ListboxContent>
    {#each collection().items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
    <ListboxEmpty>No frameworks found</ListboxEmpty>
  </ListboxContent>
</Listbox>