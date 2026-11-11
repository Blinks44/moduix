<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button } from '@/components/button';
  import { MenuTrigger } from '@/components/menu';

  let { children }: { children?: Snippet } = $props();
</script>

<MenuTrigger>
  {#snippet asChild(props)}<Button {...props()}>{@render children?.()}</Button>{/snippet}
</MenuTrigger>