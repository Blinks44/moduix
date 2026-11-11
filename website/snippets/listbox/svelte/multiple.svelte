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

  const days = createListCollection({
    items: [
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' },
      { label: 'Sunday', value: 'sun' },
    ],
  });
</script>

<Listbox collection={days} selectionMode="multiple" defaultValue={['mon', 'wed', 'fri']}>
  <ListboxLabel>Select days</ListboxLabel>
  <ListboxContent>
    {#each days.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
  <ListboxValueText />
</Listbox>