<script lang="ts">
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemText,
    ListboxLabel,
  } from '@/components/listbox';
  import { fruits } from './fruits';

  let value: string[] = $state(['mango']);
</script>

<div>
  <Listbox bind:value collection={fruits}>
    <ListboxLabel>Controlled fruit</ListboxLabel>
    <ListboxContent>
      {#each fruits.items as item (item.value)}
        <ListboxItem {item}><ListboxItemText>{item.label}</ListboxItemText></ListboxItem>
      {/each}
    </ListboxContent>
  </Listbox>
  <button type="button" onclick={() => (value = ['apple'])}>Set apple</button>
</div>