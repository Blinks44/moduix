<script lang="ts">
  import { StepsTrigger, type StepsTriggerProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsTriggerProps = $props();
</script>

<StepsTrigger
  {...props}
  bind:ref
  class={cn(
    'group/steps-trigger relative z-1 inline-flex min-w-0 cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent p-0 text-start text-inherit no-underline outline-none select-none [font:inherit] focus-visible:outline-focus-inset focus-visible:outline-offset-focus focus-visible:outline-ring data-[orientation=vertical]:items-start',
    className,
  )}
  data-slot="steps-trigger"
/>