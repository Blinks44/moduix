<script lang="ts">
  import { Check as CheckIcon } from '@lucide/svelte';
  import { ToggleGroupItem, useToggleGroupContext } from '@moduix/svelte/toggle-group';
  import type { Snippet } from 'svelte';

  let { value, children }: { value: string; children?: Snippet } = $props();
  const toggleGroup = useToggleGroupContext();
</script>

<ToggleGroupItem {value}>
  {@render children?.()}
  {#if toggleGroup().value.includes(value)}
    <CheckIcon aria-hidden="true" focusable="false" />
  {/if}
</ToggleGroupItem>