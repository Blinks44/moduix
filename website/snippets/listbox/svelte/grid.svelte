<script lang="ts">
  import { createGridCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const colors = createGridCollection({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
    columnCount: 3,
  });
</script>

<Listbox collection={colors}>
  <ListboxLabel>Pick a color</ListboxLabel>
  <ListboxContent>
    {#each colors.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>