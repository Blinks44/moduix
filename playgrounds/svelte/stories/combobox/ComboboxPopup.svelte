<script lang="ts">
  import {
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
  } from '@/components/combobox';

  type Item = { label: string; value: string };

  let { items }: { items: readonly Item[] } = $props();
</script>

<ComboboxPositioner>
  <ComboboxContent>
    <ComboboxEmpty>No options found.</ComboboxEmpty>
    <ComboboxList>
      {#each items as item (item.value)}
        <ComboboxOption {item}>{item.label}</ComboboxOption>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</ComboboxPositioner>