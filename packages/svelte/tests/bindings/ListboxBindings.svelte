<script lang="ts">
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemText,
    ListboxLabel,
  } from '@/components/listbox';
  import { fruits } from '../listbox/fruits';

  let value = $state<string[]>([]);
  let highlightedValue = $state<string | null>(null);

  export const write = (key: 'value' | 'highlightedValue') => {
    if (key === 'value') value = ['mango'];
    if (key === 'highlightedValue') highlightedValue = 'mango';
  };
  export const read = () => ({ value, highlightedValue });
</script>

<Listbox bind:value bind:highlightedValue collection={fruits}>
  <ListboxLabel>Fruit</ListboxLabel>
  <ListboxContent>
    {#each fruits.items as item (item.value)}
      <ListboxItem {item}><ListboxItemText>{item.label}</ListboxItemText></ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>