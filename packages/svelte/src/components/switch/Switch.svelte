<script module lang="ts">
  import type { SwitchRootProps as ArkSwitchRootProps } from '@ark-ui/svelte/switch';

  export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface SwitchRootProps extends ArkSwitchRootProps {
    size?: SwitchSize;
  }
</script>

<script lang="ts">
  import { SwitchRoot } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';

  let {
    class: className,
    checked = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: SwitchRootProps = $props();
</script>

<SwitchRoot
  {...props}
  bind:ref
  bind:checked
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="switch-root"
/>