<script lang="ts">
  import { NumberInputControl, type NumberInputControlProps } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NumberInputControlProps = $props();
</script>

<NumberInputControl
  {...props}
  bind:ref
  class={cn(
    'group/number-input-control inline-flex rounded-md outline-focus-halo outline-transparent transition-[outline-color] duration-normal ease-in-out focus-within:outline-ring/50 group-data-invalid/number-input:focus-within:outline-destructive/20',
    className,
  )}
  data-slot="number-input-control"
/>