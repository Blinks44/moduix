<script lang="ts">
  import { DrawerSwipeArea, type DrawerSwipeAreaProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerSwipeAreaProps = $props();

  const swipeAreaClass =
    'fixed z-50 touch-none data-disabled:pointer-events-none data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10 data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:right-0 data-[swipe-direction=left]:w-10 data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:left-0 data-[swipe-direction=right]:w-10 data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10';
</script>

<DrawerSwipeArea
  {...props}
  bind:ref
  class={cn(swipeAreaClass, className)}
  data-slot="drawer-swipe-area"
/>