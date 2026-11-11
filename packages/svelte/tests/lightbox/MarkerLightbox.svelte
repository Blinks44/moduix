<script lang="ts">
  import {
    Lightbox,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
  } from '@/components/lightbox';
</script>

<div>
  <Lightbox defaultOpen portalled={false}>
    <LightboxPositioner>
      <LightboxContent aria-label="First preview">
        <LightboxImage alt="Closes" closeOnClick data-close-on-click="" src="/first.jpg" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
  <Lightbox defaultOpen portalled={false}>
    <LightboxPositioner>
      <LightboxContent aria-label="Second preview">
        <LightboxImage alt="Stays open" data-close-on-click="" src="/second.jpg" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</div>