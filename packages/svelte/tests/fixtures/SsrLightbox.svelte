<script lang="ts">
  import {
    Lightbox,
    LightboxBody,
    LightboxCloseIcon,
    LightboxContent,
    LightboxDescription,
    LightboxHeader,
    LightboxImage,
    LightboxPositioner,
    LightboxTitle,
  } from '@/components/lightbox';
</script>

<Lightbox defaultOpen portalled={false}>
  <LightboxPositioner>
    <LightboxContent>
      <LightboxCloseIcon />
      <LightboxHeader>
        <LightboxTitle>Preview</LightboxTitle>
        <LightboxDescription>Description</LightboxDescription>
      </LightboxHeader>
      <LightboxBody><LightboxImage src="/full-size.jpg" alt="Mountain ridge" /></LightboxBody>
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>