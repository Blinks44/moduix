<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '@moduix/svelte/avatar';
  import { Stack } from '@moduix/svelte/stack';

  const avatarImage =
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
  let status = $state('idle');
</script>

<Stack align="center" gap="3">
  <Avatar onStatusChange={(details) => (status = details.status)}>
    <AvatarFallback>AT</AvatarFallback>
    <AvatarImage src={avatarImage} alt="Alex T." />
  </Avatar>
  <div data-preview-meta>
    <output>Status: {status}</output>
  </div>
</Stack>