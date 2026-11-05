<script lang="ts">
  import { SliderValueText, type SliderValueTextProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderValueTextProps = $props();
</script>

<SliderValueText
  {...props}
  bind:ref
  class={cn(
    'justify-self-end text-end text-sm leading-5 group-data-[orientation=vertical]:[grid-area:value]',
    className,
  )}
  data-slot="slider-value-text"
/>