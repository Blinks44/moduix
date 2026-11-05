<script lang="ts">
  import {
    NumberInputValueText,
    type NumberInputValueTextProps,
  } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NumberInputValueTextProps = $props();
</script>

<NumberInputValueText
  {...props}
  bind:ref
  class={cn('text-sm leading-5 text-muted-foreground tabular-nums', className)}
  data-slot="number-input-value-text"
/>