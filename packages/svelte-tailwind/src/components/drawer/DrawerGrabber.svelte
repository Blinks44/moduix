<script lang="ts">
  import { DrawerGrabber, type DrawerGrabberProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerGrabberProps = $props();

  const grabberClass =
    'group/grabber flex w-full shrink-0 cursor-grab items-center justify-center pb-1 select-none group-data-[swipe-direction=left]/drawer:hidden group-data-[swipe-direction=right]/drawer:hidden active:cursor-grabbing';
</script>

<DrawerGrabber {...props} bind:ref class={cn(grabberClass, className)} data-slot="drawer-grabber" />