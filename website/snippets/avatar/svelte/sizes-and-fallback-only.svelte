<script lang="ts">
  import { Avatar, AvatarFallback } from '@moduix/svelte/avatar';
  import { Stack } from '@moduix/svelte/stack';

  const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<Stack direction="row" align="center" justify="center" wrap="nowrap" gap="3">
  {#each avatarSizes as size (size)}
    <Avatar {size}>
      <AvatarFallback>{size.toUpperCase()}</AvatarFallback>
    </Avatar>
  {/each}
</Stack>