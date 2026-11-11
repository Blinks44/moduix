<script module lang="ts">
  import type { NumberInputRootProps as ArkNumberInputRootProps } from '@ark-ui/svelte/number-input';

  export type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface NumberInputRootProps extends ArkNumberInputRootProps {
    size?: NumberInputSize;
  }
</script>

<script lang="ts">
  import { NumberInputRoot } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="number-input-root"
/>