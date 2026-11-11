<script lang="ts">
  import { ImageCropperRoot, type ImageCropperRootProps } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';
  const rootClass =
    'grid w-[32rem] max-w-full gap-3 data-dragging:cursor-grabbing data-panning:cursor-grabbing';

  let {
    class: className,
    flip = $bindable(),
    ref = $bindable(null),
    rotation = $bindable(),
    zoom = $bindable(),
    ...props
  }: ImageCropperRootProps = $props();
</script>

<ImageCropperRoot
  {...props}
  bind:ref
  bind:flip
  bind:rotation
  bind:zoom
  class={cn(rootClass, className)}
  data-slot="image-cropper-root"
/>