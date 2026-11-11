<script lang="ts">
  import {
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    type ListCollection,
  } from '@/components/listbox';

  interface OptionItem {
    label: string;
    value: string;
    disabled?: boolean;
  }

  let { collection }: { collection: ListCollection<OptionItem> } = $props();
</script>

{#each collection.items as item (item.value)}
  <ListboxItem {item}>
    <ListboxItemText>{item.label}</ListboxItemText>
    <ListboxItemIndicator />
  </ListboxItem>
{/each}