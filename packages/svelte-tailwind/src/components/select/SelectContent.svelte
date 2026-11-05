<script lang="ts">
  import { SelectContent, type SelectContentProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectContentProps = $props();
</script>

<SelectContent
  {...props}
  bind:ref
  class={cn(
    'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-(--available-width) min-w-(--reference-width) origin-(--transform-origin) scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="select-content"
/>