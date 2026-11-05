<script module lang="ts">
  import type { PinInputRootProps as ArkPinInputRootProps } from '@ark-ui/svelte/pin-input';

  export type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface PinInputRootProps extends ArkPinInputRootProps {
    size?: PinInputSize;
  }
</script>

<script lang="ts">
  import { PinInputRoot } from '@ark-ui/svelte/pin-input';
  import { clsx } from 'clsx';
  import styles from './PinInput.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="pin-input-root"
/>