<script lang="ts">
  import { TimerActionTrigger, type TimerActionTriggerProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerActionTriggerProps = $props();
  const actionTriggerClass =
    'inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition-[background-color] duration-normal ease-in-out focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-disabled [&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';
</script>

<TimerActionTrigger
  {...props}
  bind:ref
  class={cn(actionTriggerClass, className)}
  data-slot="timer-action-trigger"
/>