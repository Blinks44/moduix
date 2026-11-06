<script lang="ts">
  import {
    LightboxBackdrop,
    LightboxBody,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
  } from '@/components/lightbox';

  let {
    alt,
    closeOnClick = false,
    src,
  }: { alt: string; closeOnClick?: boolean; src: string } = $props();
</script>

<LightboxBackdrop />
<LightboxPositioner>
  <LightboxContent aria-label={alt}>
    <LightboxCloseIcon />
    <LightboxBody>
      <LightboxImage {src} {alt} {closeOnClick} />
    </LightboxBody>
  </LightboxContent>
</LightboxPositioner>