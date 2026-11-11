<script lang="ts">
  import { RadioGroupIndicator, type RadioGroupIndicatorProps } from '@ark-ui/svelte/radio-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupIndicatorProps = $props();
</script>

<RadioGroupIndicator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none top-(--top) left-(--left) h-(--height) w-(--width) rounded-md bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]',
    className,
  )}
  data-slot="radio-group-indicator"
/>