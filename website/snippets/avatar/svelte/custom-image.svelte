<script lang="ts">
  import { Avatar, AvatarContext, AvatarFallback } from '@moduix/svelte/avatar';
  import styles from '@/components/examples/avatar/avatar-custom-image.module.css';

  const avatarImage =
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
</script>

<Avatar>
  <AvatarFallback>AT</AvatarFallback>
  <AvatarContext>
    {#snippet render(avatar)}
      <img {...avatar().getImageProps()} src={avatarImage} alt="Alex T." class={styles.image} />
    {/snippet}
  </AvatarContext>
</Avatar>