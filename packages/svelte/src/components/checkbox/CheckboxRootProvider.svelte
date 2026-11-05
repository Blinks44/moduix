<script module lang="ts">
  import type { CheckboxRootProviderProps as ArkCheckboxRootProviderProps } from '@ark-ui/svelte/checkbox';
  import type { CheckboxSize } from './Checkbox.svelte';

  export interface CheckboxRootProviderProps extends ArkCheckboxRootProviderProps {
    size?: CheckboxSize;
  }
</script>

<script lang="ts">
  import { CheckboxRootProvider } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: CheckboxRootProviderProps = $props();
</script>

<CheckboxRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="checkbox-root-provider"
/>