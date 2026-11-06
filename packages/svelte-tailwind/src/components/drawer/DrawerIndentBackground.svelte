<script lang="ts">
  import { DrawerIndentBackground, type DrawerIndentBackgroundProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: DrawerIndentBackgroundProps = $props();

  const indentBackgroundClass =
    'pointer-events-none absolute inset-0 bg-foreground opacity-0 [transition:opacity_var(--moduix-transition-spring)] data-active:opacity-[calc(1-var(--drawer-swipe-progress,0))] motion-reduce:[transition-duration:1ms]';
</script>

<DrawerIndentBackground
  {...props}
  bind:ref
  class={cn(indentBackgroundClass, className)}
  data-slot="drawer-indent-background"
/>