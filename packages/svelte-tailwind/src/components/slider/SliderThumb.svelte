<script lang="ts">
  import { SliderThumb, type SliderThumbProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderThumbProps = $props();
</script>

<SliderThumb
  {...props}
  bind:ref
  class={cn(
    'flex size-4 items-center justify-center rounded-full border border-input bg-background shadow-sm outline-0 transition-[border-color,box-shadow] duration-normal ease-in-out focus-visible:border-ring focus-visible:ring-(length:--moduix-focus-ring-halo-width) focus-visible:ring-ring/50 data-dragging:border-ring data-dragging:shadow-md data-dragging:ring-(length:--moduix-focus-ring-halo-width) data-dragging:ring-ring/50 data-invalid:border-destructive data-invalid:focus-visible:ring-destructive/20',
    className,
  )}
  data-slot="slider-thumb"
/>