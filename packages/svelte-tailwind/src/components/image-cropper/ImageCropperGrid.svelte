<script lang="ts">
  import { ImageCropperGrid, type ImageCropperGridProps } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperGridProps = $props();
</script>

<ImageCropperGrid
  {...props}
  bind:ref
  class={cn(
    'border-white/62 data-[axis=horizontal]:border-y data-[axis=vertical]:border-x',
    className,
  )}
  data-slot="image-cropper-grid"
/>