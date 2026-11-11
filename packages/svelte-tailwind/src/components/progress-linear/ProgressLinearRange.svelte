<script lang="ts">
  import { ProgressRange, type ProgressRangeProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressRangeProps = $props();
</script>

<ProgressRange
  {...props}
  bind:ref
  class={cn(
    'h-full rounded-[inherit] bg-primary transition-[width,height] duration-normal ease-in-out data-[orientation=vertical]:w-full data-[state=indeterminate]:data-[orientation=horizontal]:w-[35%] data-[state=indeterminate]:data-[orientation=horizontal]:animate-moduix-progress-linear-indeterminate data-[state=indeterminate]:data-[orientation=vertical]:h-[35%] data-[state=indeterminate]:data-[orientation=vertical]:animate-moduix-progress-linear-indeterminate-vertical motion-reduce:data-[state=indeterminate]:data-[orientation]:animate-none [&:dir(rtl)]:data-[state=indeterminate]:data-[orientation=horizontal]:-scale-x-100',
    className,
  )}
  data-slot="progress-linear-range"
/>