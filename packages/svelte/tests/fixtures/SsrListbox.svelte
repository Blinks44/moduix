<script lang="ts">
  import { Listbox, ListboxContent, ListboxItem, ListboxLabel } from '@/components/listbox';
  import { fruits } from '../listbox/fruits';
</script>

<Listbox collection={fruits}>
  <ListboxLabel>Server fruit</ListboxLabel>
  <ListboxContent><ListboxItem item={fruits.items[0]!}>Apple</ListboxItem></ListboxContent>
</Listbox>