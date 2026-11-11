<script lang="ts">
  import { TourActionTrigger, type TourActionTriggerProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: TourActionTriggerProps = $props();
</script>

<TourActionTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild &&
      `inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground outline-0 transition-[background-color,color] duration-normal ease-in-out focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-[type=close]:border-transparent data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-transparent data-[type=next]:bg-primary data-[type=next]:text-primary-foreground [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent`,
    className,
  )}
  data-slot="tour-action-trigger"
/>