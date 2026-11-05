<script module lang="ts">
  import type { RadioGroupRootProviderProps as ArkRadioGroupRootProviderProps } from '@ark-ui/svelte/radio-group';
  import type { RadioGroupSize } from './RadioGroup.svelte';

  export interface RadioGroupRootProviderProps extends ArkRadioGroupRootProviderProps {
    size?: RadioGroupSize;
  }
</script>

<script lang="ts">
  import { RadioGroupRootProvider } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RadioGroupRootProviderProps = $props();
</script>

<RadioGroupRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="radio-group-root-provider"
/>