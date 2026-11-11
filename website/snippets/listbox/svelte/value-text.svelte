<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    ListboxValueText,
  } from '@moduix/svelte/listbox';

  const countries = createListCollection({
    items: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' },
    ],
  });
</script>

<Listbox collection={countries} defaultValue={['ca']}>
  <ListboxLabel>Select country</ListboxLabel>
  <ListboxContent>
    {#each countries.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
  <ListboxValueText placeholder="No country selected" />
</Listbox>