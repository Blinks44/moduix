<script lang="ts">
  import { TourContent, type TourContentProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourContentProps = $props();
</script>

<TourContent
  {...props}
  bind:ref
  class={cn(
    'relative flex max-h-[min(24rem,var(--available-height,100dvh))] w-[20rem] max-w-[min(calc(100vw-var(--moduix-spacing-8)),var(--available-width,100vw))] origin-(--transform-origin) flex-col gap-1 rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:pointer-events-auto data-[state=open]:animate-moduix-popup-in data-[type=dialog]:w-[26rem] data-[type=floating]:w-[22rem] motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="tour-content"
/>