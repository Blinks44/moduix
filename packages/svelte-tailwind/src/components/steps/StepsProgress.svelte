<script lang="ts">
  import { StepsProgress, type StepsProgressProps } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: StepsProgressProps = $props();

  const progressClass =
    "relative h-0.5 w-full overflow-hidden rounded-full bg-border before:absolute before:inset-y-0 before:start-0 before:w-[var(--percent,0%)] before:rounded-[inherit] before:bg-foreground before:transition-[width] before:duration-normal before:ease-in-out before:content-['']";
</script>

<StepsProgress
  {...props}
  bind:ref
  class={cn(progressClass, className)}
  data-slot="steps-progress"
/>