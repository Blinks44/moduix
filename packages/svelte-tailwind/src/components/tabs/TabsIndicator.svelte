<script lang="ts">
  import { TabIndicator, type TabIndicatorProps } from '@ark-ui/svelte/tabs';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TabIndicatorProps = $props();
</script>

<TabIndicator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none top-(--top) left-(--left) -z-1 h-(--height) w-(--width) rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none group-data-[variant=line]/tabs:data-[orientation=horizontal]:top-auto group-data-[variant=line]/tabs:data-[orientation=horizontal]:bottom-0 group-data-[variant=line]/tabs:data-[orientation=horizontal]:h-0.5 group-data-[variant=line]/tabs:data-[orientation=vertical]:start-auto group-data-[variant=line]/tabs:data-[orientation=vertical]:end-0 group-data-[variant=line]/tabs:data-[orientation=vertical]:w-0.5',
    className,
  )}
  data-slot="tabs-indicator"
/>