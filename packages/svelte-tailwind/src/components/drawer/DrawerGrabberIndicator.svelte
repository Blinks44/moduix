<script lang="ts">
  import { DrawerGrabberIndicator, type DrawerGrabberIndicatorProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerGrabberIndicatorProps = $props();

  const grabberIndicatorClass =
    'h-1 w-12 rounded-full bg-muted-foreground opacity-[0.45] transition-opacity duration-normal ease-in-out [@media(hover:hover)]:group-hover/grabber:opacity-70';
</script>

<DrawerGrabberIndicator
  {...props}
  bind:ref
  class={cn(grabberIndicatorClass, className)}
  data-slot="drawer-grabber-indicator"
/>