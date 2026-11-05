<script module lang="ts">
  import type { CheckboxRootProps as ArkCheckboxRootProps } from '@ark-ui/svelte/checkbox';

  export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface CheckboxRootProps extends ArkCheckboxRootProps {
    size?: CheckboxSize;
  }
</script>

<script lang="ts">
  import { CheckboxRoot } from '@ark-ui/svelte/checkbox';
  import { clsx } from 'clsx';
  import styles from './Checkbox.module.css';

  let {
    class: className,
    checked = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: CheckboxRootProps = $props();
</script>

<CheckboxRoot
  {...props}
  bind:ref
  bind:checked
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="checkbox-root"
/>