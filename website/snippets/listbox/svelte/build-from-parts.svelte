<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import CheckIcon from '@lucide/svelte/icons/check';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const countries = createListCollection({
    items: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' },
      { label: 'Australia', value: 'au' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Japan', value: 'jp' },
    ],
  });
</script>

<Listbox collection={countries}>
  <ListboxLabel>Select country</ListboxLabel>
  <ListboxContent>
    {#each countries.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator>
          <CheckIcon strokeWidth={3} />
        </ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>