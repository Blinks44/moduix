<script module lang="ts">
  import type { NumberInputRootProps as ArkNumberInputRootProps } from '@ark-ui/svelte/number-input';

  export type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface NumberInputRootProps extends ArkNumberInputRootProps {
    size?: NumberInputSize;
  }
</script>

<script lang="ts">
  import { NumberInputRoot } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: NumberInputRootProps = $props();
</script>

<NumberInputRoot
  {...props}
  bind:ref
  bind:value
  class={cn(
    'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    className,
  )}
  data-size={size}
  data-slot="number-input-root"
/>