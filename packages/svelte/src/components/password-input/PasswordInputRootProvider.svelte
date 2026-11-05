<script module lang="ts">
  import type { PasswordInputRootProviderProps as ArkPasswordInputRootProviderProps } from '@ark-ui/svelte/password-input';
  import type { PasswordInputSize } from './PasswordInput.svelte';

  export interface PasswordInputRootProviderProps extends ArkPasswordInputRootProviderProps {
    size?: PasswordInputSize;
  }
</script>

<script lang="ts">
  import { PasswordInputRootProvider } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: PasswordInputRootProviderProps = $props();
</script>

<PasswordInputRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="password-input-root-provider"
/>