<script lang="ts">
  import { DialogContent, type DialogContentProps } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DialogContentProps = $props();
</script>

<DialogContent
  {...props}
  bind:ref
  class={cn(
    'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(34rem,calc(100dvh-5rem))] w-[37.5rem] max-w-full origin-top flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-command-palette-content-out data-[state=open]:animate-moduix-command-palette-content-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="command-palette-content"
/>