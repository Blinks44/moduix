<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '@moduix/svelte/avatar';
  import styles from '@/components/examples/avatar/avatar-status.module.css';

  const avatarImage =
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
</script>

<Avatar size="lg">
  <AvatarFallback>AT</AvatarFallback>
  <AvatarImage src={avatarImage} alt="Alex T." />
  <span class={styles.status} role="img" aria-label="Online"></span>
</Avatar>