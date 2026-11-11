<script lang="ts">
  import { MenuPositioner, type MenuPositionerProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import { menuPositionerVariants } from './Menu.variants';

  let { class: className, ref = $bindable(null), ...props }: MenuPositionerProps = $props();
</script>

<OverlayPortal>
  <MenuPositioner
    {...props}
    bind:ref
    class={cn(menuPositionerVariants(), className)}
    data-slot="menu-positioner"
  />
</OverlayPortal>