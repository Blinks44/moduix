<script lang="ts">
  import { Image, ImageSource } from '@/components/image';

  const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

  let imageRef = $state<HTMLImageElement | null>(null);
  let sourceRef = $state<HTMLSourceElement | null>(null);

  export const getRefs = () => ({ imageRef, sourceRef });
</script>

<picture>
  <ImageSource
    bind:ref={sourceRef}
    data-slot="custom-source"
    media="(min-width: 48rem)"
    type="image/avif"
    src={imageUrl}
    width={800}
    height={520}
  />
  <Image
    bind:ref={imageRef}
    data-slot="custom-root"
    src={imageUrl}
    alt="Mountain landscape"
    width={800}
    height={520}
  />
</picture>