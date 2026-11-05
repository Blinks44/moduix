<script lang="ts">
  import type { Snippet } from 'svelte';
  import { SelectItem, SelectItemIndicator, SelectItemText } from '@/components/select';
  import type { OptionItem } from './collections';

  let { items, prefix }: { items: OptionItem[]; prefix?: Snippet } = $props();
</script>

{#each items as item (item.value)}
  <SelectItem {item}>
    <SelectItemText>{@render prefix?.()}{item.label}</SelectItemText>
    <SelectItemIndicator />
  </SelectItem>
{/each}