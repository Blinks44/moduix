<script lang="ts">
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    createListCollection,
  } from '@moduix/svelte/listbox';
  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Preact', value: 'preact' },
    ],
  });
</script>

<Listbox collection={frameworks} selectionMode="extended">
  <ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel>
  <ListboxContent>
    {#each frameworks.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>