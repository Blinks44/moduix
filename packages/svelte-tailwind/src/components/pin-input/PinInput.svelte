<script module lang="ts">
  import type { PinInputRootProps as ArkPinInputRootProps } from '@ark-ui/svelte/pin-input';

  export type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface PinInputRootProps extends ArkPinInputRootProps {
    size?: PinInputSize;
  }
</script>

<script lang="ts">
  import { PinInputRoot } from '@ark-ui/svelte/pin-input';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    placeholder = '',
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: PinInputRootProps = $props();
</script>

<PinInputRoot
  {...props}
  bind:ref
  bind:value
  {placeholder}
  class={cn(
    'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    className,
  )}
  data-size={size}
  data-slot="pin-input-root"
/>