<script lang="ts">
  import type { Snippet } from 'svelte';
  import { SelectContent, SelectPositioner } from '@/components/select';

  let { children }: { children: Snippet } = $props();
</script>

<SelectPositioner><SelectContent>{@render children()}</SelectContent></SelectPositioner>