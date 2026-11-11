<script lang="ts">
  import type { Snippet } from 'svelte';

  // Renders a toast title or description: plain content or a snippet passed to the store.
  let { value }: { value: unknown } = $props();
</script>

{#if typeof value === 'function'}
  {@render (value as Snippet)()}
{:else if value != null}
  {value}
{/if}