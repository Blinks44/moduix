<script module lang="ts">
  import type { RadioGroupRootProps as ArkRadioGroupRootProps } from '@ark-ui/svelte/radio-group';

  export type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface RadioGroupRootProps extends ArkRadioGroupRootProps {
    size?: RadioGroupSize;
  }
</script>

<script lang="ts">
  import { RadioGroupRoot } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RadioGroupRootProps = $props();
</script>

<RadioGroupRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="radio-group-root"
/>