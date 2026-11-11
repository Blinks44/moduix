<script lang="ts">
  import { AvatarFallback, type AvatarFallbackProps } from '@ark-ui/svelte/avatar';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AvatarFallbackProps = $props();
</script>

<AvatarFallback
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-full items-center justify-center overflow-hidden rounded-[inherit] data-[state=hidden]:hidden',
    className,
  )}
  data-slot="avatar-fallback"
/>