<script lang="ts">
  import type { Snippet } from 'svelte';
  import { MenuContent, MenuPositioner, MenuViewport } from '@/components/menu';

  let { children }: { children?: Snippet } = $props();
</script>

<MenuPositioner>
  <MenuContent>
    <MenuViewport>{@render children?.()}</MenuViewport>
  </MenuContent>
</MenuPositioner>