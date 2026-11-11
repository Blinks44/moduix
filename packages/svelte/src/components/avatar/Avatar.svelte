<script module lang="ts">
  import type { AvatarRootProps as ArkAvatarRootProps } from '@ark-ui/svelte/avatar';

  export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface AvatarRootProps extends ArkAvatarRootProps {
    size?: AvatarSize;
  }
</script>

<script lang="ts">
  import { AvatarRoot } from '@ark-ui/svelte/avatar';
  import { clsx } from 'clsx';
  import styles from './Avatar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: AvatarRootProps = $props();
</script>

<AvatarRoot
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="avatar-root"
/>