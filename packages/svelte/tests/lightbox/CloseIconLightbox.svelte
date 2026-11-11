<script lang="ts">
  import {
    Lightbox,
    LightboxBody,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    LightboxTrigger,
  } from '@/components/lightbox';
</script>

<Lightbox portalled={false}>
  <LightboxTrigger>Open preview</LightboxTrigger>
  <LightboxPositioner>
    <LightboxContent aria-label="Image preview">
      <LightboxCloseIcon />
      <LightboxBody style="width: 240px; height: 160px">
        <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
      </LightboxBody>
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>