<script lang="ts">
  import { StepsSeparator, type StepsSeparatorProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsSeparatorProps = $props();
</script>

<StepsSeparator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none mx-2 h-px min-w-8 flex-auto bg-border group-last/steps-item:hidden data-complete:bg-foreground data-[orientation=vertical]:absolute data-[orientation=vertical]:start-[15.5px] data-[orientation=vertical]:top-10 data-[orientation=vertical]:-bottom-2 data-[orientation=vertical]:m-0 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px data-[orientation=vertical]:min-w-0',
    className,
  )}
  data-slot="steps-separator"
/>