<script lang="ts">
  import { NumberInputLabel, type NumberInputLabelProps } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NumberInputLabelProps = $props();
</script>

<NumberInputLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium text-foreground', className)}
  data-slot="number-input-label"
/>