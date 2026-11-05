<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DialogBackdrop, DialogContent, DialogPositioner } from '@/components/dialog';

  let { children }: { children: Snippet } = $props();
</script>

<DialogBackdrop />
<DialogPositioner>
  <DialogContent>{@render children()}</DialogContent>
</DialogPositioner>