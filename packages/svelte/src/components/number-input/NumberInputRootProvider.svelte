<script module lang="ts">
  import type { NumberInputRootProviderProps as ArkNumberInputRootProviderProps } from '@ark-ui/svelte/number-input';
  import type { NumberInputSize } from './NumberInput.svelte';

  export interface NumberInputRootProviderProps extends ArkNumberInputRootProviderProps {
    size?: NumberInputSize;
  }
</script>

<script lang="ts">
  import { NumberInputRootProvider } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="number-input-root-provider"
/>