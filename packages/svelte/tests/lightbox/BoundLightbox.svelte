<script lang="ts">
  import {
    Lightbox,
    LightboxBind,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    type LightboxImageSelectDetails,
  } from '@/components/lightbox';

  let root: HTMLElement | undefined = $state();
  let image: LightboxImageSelectDetails | null = $state(null);
</script>

<div bind:this={root}>
  <button type="button">
    <img src="/thumbnail.jpg" data-lightbox-src="/full-size.jpg" alt="Mountain ridge" />
  </button>
</div>
<Lightbox portalled={false}>
  <LightboxBind
    rootRef={() => root}
    selector="button"
    onImageSelect={(details) => (image = details)}
  />
  <LightboxPositioner>
    <LightboxContent aria-label="Image preview">
      {#if image}<LightboxImage src={image.src} alt={image.alt ?? ''} />{/if}
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>