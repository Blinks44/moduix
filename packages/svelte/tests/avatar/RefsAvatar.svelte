<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';

  let rootRef = $state<HTMLElement | null>(null);
  let fallbackRef = $state<HTMLElement | null>(null);
  let imageRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ fallbackRef, imageRef, rootRef });
</script>

<Avatar
  bind:ref={rootRef}
  size="lg"
  id="profile"
  aria-label="Alex T."
  data-probe="root"
  class="consumer-root"
>
  <AvatarFallback bind:ref={fallbackRef} class="consumer-fallback">AT</AvatarFallback>
  <AvatarImage bind:ref={imageRef} alt="Alex T." class="consumer-image" />
</Avatar>