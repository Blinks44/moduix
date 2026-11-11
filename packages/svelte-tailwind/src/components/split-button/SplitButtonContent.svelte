<script lang="ts">
  import { MenuContent, type MenuContentProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { menuContentVariants } from '../menu/Menu.variants';
  import MenuViewport from '../menu/MenuViewport.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: MenuContentProps = $props();
</script>

<MenuContent
  {...props}
  bind:ref
  class={cn(menuContentVariants(), className)}
  data-slot="split-button-content"
>
  <MenuViewport>{@render children?.()}</MenuViewport>
</MenuContent>