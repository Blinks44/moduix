<script lang="ts">
  import {
    ImageCropperSelection,
    type ImageCropperSelectionProps,
  } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperSelectionProps = $props();
</script>

<ImageCropperSelection
  {...props}
  bind:ref
  class={cn(
    'cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent',
    className,
  )}
  data-slot="image-cropper-selection"
/>