<script module lang="ts">
  import type { AvatarRootProviderProps as ArkAvatarRootProviderProps } from '@ark-ui/svelte/avatar';
  import type { AvatarSize } from './Avatar.svelte';

  export interface AvatarRootProviderProps extends ArkAvatarRootProviderProps {
    size?: AvatarSize;
  }
</script>

<script lang="ts">
  import { AvatarRootProvider } from '@ark-ui/svelte/avatar';
  import { clsx } from 'clsx';
  import styles from './Avatar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: AvatarRootProviderProps = $props();
</script>

<AvatarRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="avatar-root-provider"
/>