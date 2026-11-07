<script lang="ts">
  import { AvatarImage, type AvatarImageProps } from '@ark-ui/svelte/avatar';
  import { clsx } from 'clsx';
  import styles from './Avatar.module.css';

  let { class: className, ref = $bindable(null), ...props }: AvatarImageProps = $props();
</script>

<AvatarImage {...props} bind:ref class={clsx(styles.image, className)} data-slot="avatar-image" />