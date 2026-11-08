<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const sizes = createListCollection({
    items: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
  });
  let value = $state<string[]>(['md']);
</script>

<Listbox bind:value collection={sizes}>
  <ListboxLabel>Select size</ListboxLabel>
  <ListboxContent>
    {#each sizes.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>