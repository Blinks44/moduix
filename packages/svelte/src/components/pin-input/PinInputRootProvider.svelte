<script module lang="ts">
  import type { PinInputRootProviderProps as ArkPinInputRootProviderProps } from '@ark-ui/svelte/pin-input';
  import type { PinInputSize } from './PinInput.svelte';

  export interface PinInputRootProviderProps extends ArkPinInputRootProviderProps {
    size?: PinInputSize;
  }
</script>

<script lang="ts">
  import { PinInputRootProvider } from '@ark-ui/svelte/pin-input';
  import { clsx } from 'clsx';
  import styles from './PinInput.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="pin-input-root-provider"
/>