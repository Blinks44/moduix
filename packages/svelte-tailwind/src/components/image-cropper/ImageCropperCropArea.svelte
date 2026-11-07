<script module lang="ts">
  import type { ImageCropperSelectionProps } from '@ark-ui/svelte/image-cropper';
  import type { ClassValue } from 'svelte/elements';

  export interface ImageCropperCropAreaProps extends Omit<ImageCropperSelectionProps, 'asChild'> {
    gridClassName?: ClassValue;
    handleClassName?: ClassValue;
  }
</script>

<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper';
  import ImageCropperGrid from './ImageCropperGrid.svelte';
  import ImageCropperHandle from './ImageCropperHandle.svelte';
  import ImageCropperSelection from './ImageCropperSelection.svelte';

  let {
    gridClassName,
    handleClassName,
    ref = $bindable(null),
    ...props
  }: ImageCropperCropAreaProps = $props();
</script>

<ImageCropperSelection {...props} bind:ref>
  <ImageCropperGrid axis="horizontal" class={gridClassName} />
  <ImageCropperGrid axis="vertical" class={gridClassName} />
  {#each ImageCropper.handles as position (position)}
    <ImageCropperHandle {position} class={handleClassName} />
  {/each}
</ImageCropperSelection>