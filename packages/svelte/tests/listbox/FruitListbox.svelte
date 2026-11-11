<script lang="ts">
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    type ListboxRootProps,
  } from '@/components/listbox';
  import { fruits } from './fruits';

  let { value = $bindable(), ...props }: Omit<ListboxRootProps, 'collection'> = $props();
</script>

<Listbox {...props} bind:value collection={fruits}>
  <ListboxLabel>Fruit</ListboxLabel>
  <ListboxContent>
    {#each fruits.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>