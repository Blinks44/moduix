<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxClearTrigger,
    ListboxContent,
    ListboxEmpty,
    ListboxFilter,
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
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'Remix', value: 'remix' },
    { label: 'Gatsby', value: 'gatsby' },
    { label: 'Preact', value: 'preact' },
  ];
  let filterText = $state('');
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
  });
  const updateFilter = (event: Event) => {
    filterText = (event.target as HTMLInputElement).value;
    filter(filterText);
  };
  const clearFilter = () => {
    filterText = '';
    filter('');
  };
</script>

<Listbox collection={collection()} typeahead={false}>
  <ListboxLabel>Select framework</ListboxLabel>
  <ListboxFilter>
    <ListboxInput placeholder="Search frameworks..." value={filterText} oninput={updateFilter} />
    {#if filterText}
      <ListboxClearTrigger onclick={clearFilter} />
    {/if}
  </ListboxFilter>
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