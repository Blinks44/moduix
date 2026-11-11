<script module lang="ts">
  import type { NumberInputRootProviderProps as ArkNumberInputRootProviderProps } from '@ark-ui/svelte/number-input';
  import type { NumberInputSize } from './NumberInput.svelte';

  export interface NumberInputRootProviderProps extends ArkNumberInputRootProviderProps {
    size?: NumberInputSize;
  }
</script>

<script lang="ts">
  import { NumberInputRootProvider } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: NumberInputRootProviderProps = $props();
</script>

<NumberInputRootProvider
  {...props}
  bind:ref
  class={cn(
    'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    className,
  )}
  data-size={size}
  data-slot="number-input-root-provider"
/>