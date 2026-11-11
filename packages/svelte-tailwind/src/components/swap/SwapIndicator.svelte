<script lang="ts">
  import { SwapIndicator, type SwapIndicatorProps } from '@ark-ui/svelte/swap';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SwapIndicatorProps = $props();

  const indicatorClass =
    'items-center justify-center group-data-[animation=flip]/swap:[backface-visibility:hidden] group-data-[animation=fade]/swap:data-[state=closed]:animate-moduix-swap-fade-exit group-data-[animation=flip]/swap:data-[state=closed]:animate-moduix-swap-flip-exit group-data-[animation=rotate]/swap:data-[state=closed]:animate-moduix-swap-rotate-exit group-data-[animation=scale]/swap:data-[state=closed]:animate-moduix-swap-scale-exit group-data-[animation=fade]/swap:data-[state=open]:animate-moduix-swap-fade-enter group-data-[animation=flip]/swap:data-[state=open]:animate-moduix-swap-flip-enter group-data-[animation=rotate]/swap:data-[state=open]:animate-moduix-swap-rotate-enter group-data-[animation=scale]/swap:data-[state=open]:animate-moduix-swap-scale-enter motion-reduce:group-data-[animation]/swap:data-[state]:animate-none';
</script>

<SwapIndicator
  {...props}
  bind:ref
  class={cn(indicatorClass, className)}
  data-slot="swap-indicator"
/>