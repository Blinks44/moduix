<script lang="ts">
  import { PinInputInput, type PinInputInputProps } from '@ark-ui/svelte/pin-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PinInputInputProps = $props();
</script>

<PinInputInput
  {...props}
  bind:ref
  class={cn(
    'size-control-md flex-none rounded-md border border-input bg-background p-0 text-center text-lg font-medium text-inherit tabular-nums outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/pin-input:size-control-lg group-data-[size=lg]/pin-input:text-xl group-data-[size=sm]/pin-input:size-control-sm group-data-[size=sm]/pin-input:text-md group-data-[size=xl]/pin-input:size-control-xl group-data-[size=xl]/pin-input:text-2xl group-data-[size=xs]/pin-input:size-control-xs group-data-[size=xs]/pin-input:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-ring/50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive/20',
    className,
  )}
  data-slot="pin-input-input"
/>