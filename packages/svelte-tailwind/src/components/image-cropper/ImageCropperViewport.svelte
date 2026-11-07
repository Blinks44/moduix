<script lang="ts">
  import {
    ImageCropperViewport,
    type ImageCropperViewportProps,
  } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperViewportProps = $props();
</script>

<ImageCropperViewport
  {...props}
  bind:ref
  class={cn(
    'aspect-[8/5] w-full rounded-lg border border-border [background:repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/1rem_1rem] data-disabled:cursor-grab',
    className,
  )}
  data-slot="image-cropper-viewport"
/>