<script lang="ts">
  import { MenuContent, type MenuContentProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { menuContentVariants } from './Menu.variants';

  let { class: className, ref = $bindable(null), ...props }: MenuContentProps = $props();
</script>

<MenuContent
  {...props}
  bind:ref
  class={cn(menuContentVariants(), className)}
  data-slot="menu-content"
/>