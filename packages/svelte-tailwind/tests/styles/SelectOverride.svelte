<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectList,
    SelectPositioner,
  } from '@/components/select';

  const collection = createListCollection({ items: [{ label: 'Apple', value: 'apple' }] });
</script>

<Select {collection} defaultOpen portalled={false}>
  <SelectPositioner>
    <SelectContent>
      <SelectList>
        <SelectItem class="p-0" item={collection.items[0]}>Apple</SelectItem>
      </SelectList>
    </SelectContent>
  </SelectPositioner>
</Select>