<script lang="ts">
  import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: PopoverCloseTriggerProps = $props();
</script>

<PopoverCloseTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild &&
      'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground outline-0 transition-[background-color,border-color,color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-disabled [@media(hover:hover)]:hover:bg-accent',
    className,
  )}
  data-slot="popover-close-trigger"
/>