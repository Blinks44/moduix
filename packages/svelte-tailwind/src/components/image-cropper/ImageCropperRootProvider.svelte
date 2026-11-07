<script lang="ts">
  import {
    ImageCropperRootProvider,
    type ImageCropperRootProviderProps,
  } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';
  const rootClass =
    'grid w-[32rem] max-w-full gap-3 data-dragging:cursor-grabbing data-panning:cursor-grabbing';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ImageCropperRootProviderProps = $props();
</script>

<ImageCropperRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="image-cropper-root-provider"
/>