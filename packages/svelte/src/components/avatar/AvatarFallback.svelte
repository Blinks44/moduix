<script lang="ts">
  import { AvatarFallback, type AvatarFallbackProps } from '@ark-ui/svelte/avatar';
  import { clsx } from 'clsx';
  import styles from './Avatar.module.css';

  let { class: className, ref = $bindable(null), ...props }: AvatarFallbackProps = $props();
</script>

<AvatarFallback
  {...props}
  bind:ref
  class={clsx(styles.fallback, className)}
  data-slot="avatar-fallback"
/>