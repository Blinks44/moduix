<script lang="ts">
  import { StepsPrevTrigger, type StepsPrevTriggerProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsPrevTriggerProps = $props();
</script>

<StepsPrevTrigger
  {...props}
  bind:ref
  class={cn(
    'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground transition-[background-color,border-color,color,opacity] duration-normal ease-in-out outline-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
    className,
  )}
  data-slot="steps-prev-trigger"
/>