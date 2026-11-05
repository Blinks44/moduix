<script module lang="ts">
  import type { PinInputRootProviderProps as ArkPinInputRootProviderProps } from '@ark-ui/svelte/pin-input';
  import type { PinInputSize } from './PinInput.svelte';

  export interface PinInputRootProviderProps extends ArkPinInputRootProviderProps {
    size?: PinInputSize;
  }
</script>

<script lang="ts">
  import { PinInputRootProvider } from '@ark-ui/svelte/pin-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: PinInputRootProviderProps = $props();
</script>

<PinInputRootProvider
  {...props}
  bind:ref
  class={cn(
    'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    className,
  )}
  data-size={size}
  data-slot="pin-input-root-provider"
/>