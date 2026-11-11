<script module lang="ts">
  import type { Snippet } from 'svelte';

  export interface SegmentGroupItemOption {
    value: string;
    label: string | Snippet;
    disabled?: boolean;
  }

  export interface SegmentGroupItemsProps {
    items: readonly (string | SegmentGroupItemOption)[];
  }
</script>

<script lang="ts">
  import { SegmentGroupItemHiddenInput } from '@ark-ui/svelte/segment-group';
  import SegmentGroupItem from './SegmentGroupItem.svelte';
  import SegmentGroupItemText from './SegmentGroupItemText.svelte';

  let { items }: SegmentGroupItemsProps = $props();
  const options = $derived(
    items.map((item): SegmentGroupItemOption =>
      typeof item === 'string' ? { value: item, label: item } : item,
    ),
  );
</script>

{#each options as option (option.value)}
  <SegmentGroupItem value={option.value} disabled={option.disabled}>
    <SegmentGroupItemText>
      {#if typeof option.label === 'string'}
        {option.label}
      {:else}
        {@render option.label()}
      {/if}
    </SegmentGroupItemText>
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
{/each}