<script lang="ts">
  import { TooltipTrigger, type TooltipTriggerProps } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: TooltipTriggerProps = $props();
</script>

<TooltipTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild &&
      'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-sm text-foreground outline-0 transition-[background-color,border-color,color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent [@media(hover:hover)]:hover:bg-accent',
    className,
  )}
  data-slot="tooltip-trigger"
/>