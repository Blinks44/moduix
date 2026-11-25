<script lang="ts">
  import { StepsNextTrigger, type StepsNextTriggerProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsNextTriggerProps = $props();
</script>

<StepsNextTrigger
  {...props}
  bind:ref
  class={cn(
    'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-sm leading-5 text-background transition-[background-color,border-color,color,opacity] duration-normal ease-in-out outline-none not-disabled:hover:border-transparent not-disabled:hover:bg-foreground/88 focus-visible:outline-focus-inset focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled',
    className,
  )}
  data-slot="steps-next-trigger"
/>