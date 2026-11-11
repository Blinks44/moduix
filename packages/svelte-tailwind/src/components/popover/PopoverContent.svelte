<script lang="ts">
  import { PopoverContent, type PopoverContentProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PopoverContentProps = $props();
</script>

<PopoverContent
  {...props}
  bind:ref
  class={cn(
    'group/popover-content relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(28rem,var(--available-width))] min-w-[min(16rem,var(--available-width))] origin-(--transform-origin) rounded-md bg-popover p-4 wrap-anywhere text-popover-foreground shadow-lg outline-1 outline-border has-[>[data-slot=popover-body]]:flex has-[>[data-slot=popover-body]]:flex-col data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="popover-content"
/>