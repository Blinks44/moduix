<script lang="ts">
  import { ImageCropperHandle, type ImageCropperHandleProps } from '@ark-ui/svelte/image-cropper';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ImageCropperHandleProps = $props();
</script>

<ImageCropperHandle
  {...props}
  bind:ref
  class={cn(
    'size-3 rounded-xs bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] data-disabled:hidden data-[position=e]:w-[0.2rem] data-[position=e]:rounded-full data-[position=n]:h-[0.2rem] data-[position=n]:rounded-full data-[position=ne]:z-1 data-[position=nw]:z-1 data-[position=s]:h-[0.2rem] data-[position=s]:rounded-full data-[position=se]:z-1 data-[position=sw]:z-1 data-[position=w]:w-[0.2rem] data-[position=w]:rounded-full',
    className,
  )}
  data-slot="image-cropper-handle"
/>