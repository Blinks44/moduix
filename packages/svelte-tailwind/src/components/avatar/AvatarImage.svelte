<script lang="ts">
  import { AvatarImage, type AvatarImageProps } from '@ark-ui/svelte/avatar';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AvatarImageProps = $props();
</script>

<AvatarImage
  {...props}
  bind:ref
  class={cn('block size-full rounded-[inherit] object-cover data-[state=hidden]:hidden', className)}
  data-slot="avatar-image"
/>