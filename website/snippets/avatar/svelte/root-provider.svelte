<script lang="ts">
  import {
    AvatarFallback,
    AvatarImage,
    AvatarRootProvider,
    useAvatar,
  } from '@moduix/svelte/avatar';
  import styles from '@/components/examples/avatar/avatar-root-provider.module.css';

  const avatarImages = [
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&dpr=2&q=80',
  ];
  let imageIndex = $state(0);
  const id = $props.id();
  const avatar = useAvatar({ id });
</script>

<div class={styles.root}>
  <AvatarRootProvider value={avatar}>
    <AvatarFallback>AT</AvatarFallback>
    <AvatarImage src={avatarImages[imageIndex]} alt="Alex T." />
  </AvatarRootProvider>
  <button type="button" onclick={() => (imageIndex = (imageIndex + 1) % avatarImages.length)}>
    Change avatar
  </button>
</div>