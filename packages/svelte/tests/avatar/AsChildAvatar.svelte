<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    type AvatarStatusChangeDetails,
  } from '@/components/avatar';

  let {
    onStatusChange,
    src,
  }: { onStatusChange?: (details: AvatarStatusChangeDetails) => void; src?: string } = $props();

  let rootRef = $state<HTMLElement | null>(null);
  let fallbackRef = $state<HTMLElement | null>(null);
  let imageRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ fallbackRef, imageRef, rootRef });
</script>

<Avatar bind:ref={rootRef} size="xl" id="avatar-link" {onStatusChange}>
  {#snippet asChild(rootProps)}
    <a {...rootProps()} href="/profile" aria-label="Alex T.">
      <AvatarFallback bind:ref={fallbackRef}>
        {#snippet asChild(fallbackProps)}
          <span {...fallbackProps()}>AT</span>
        {/snippet}
      </AvatarFallback>
      <AvatarImage bind:ref={imageRef} {src} alt="Alex T. photo" class="consumer-image">
        {#snippet asChild(imageProps)}
          <img {...imageProps()} data-replacement="image" alt="Alex T. photo" />
        {/snippet}
      </AvatarImage>
    </a>
  {/snippet}
</Avatar>