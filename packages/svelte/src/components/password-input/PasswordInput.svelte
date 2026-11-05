<script module lang="ts">
  import type { PasswordInputRootProps as ArkPasswordInputRootProps } from '@ark-ui/svelte/password-input';

  export type PasswordInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface PasswordInputRootProps extends ArkPasswordInputRootProps {
    size?: PasswordInputSize;
  }
</script>

<script lang="ts">
  import { PasswordInputRoot } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let {
    class: className,
    visible = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: PasswordInputRootProps = $props();
</script>

<PasswordInputRoot
  {...props}
  bind:ref
  bind:visible
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="password-input-root"
/>