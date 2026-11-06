<script lang="ts">
  import { HoverCardTrigger, type HoverCardTriggerProps } from '@ark-ui/svelte/hover-card';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: HoverCardTriggerProps = $props();

  const triggerClass =
    'inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-current/60 decoration-1 underline-offset-2 outline-0 transition-[text-decoration-color] duration-fast ease-in-out focus-visible:rounded-xs focus-visible:no-underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:decoration-current [@media(hover:hover)]:hover:decoration-current';
</script>

<HoverCardTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && triggerClass, className)}
  data-slot="hover-card-trigger"
/>