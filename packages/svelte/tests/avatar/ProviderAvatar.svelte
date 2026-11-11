<script lang="ts">
  import { AvatarFallback, AvatarImage, AvatarRootProvider, useAvatar } from '@/components/avatar';

  let rootRef = $state<HTMLElement | null>(null);
  const avatar = useAvatar({ id: 'provider-avatar' });

  export const getRefs = () => ({ rootRef });
</script>

<AvatarRootProvider bind:ref={rootRef} value={avatar} size="sm" class="consumer-provider">
  <AvatarFallback>AT</AvatarFallback>
  <AvatarImage alt="Alex T." />
</AvatarRootProvider>