<script lang="ts">
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxBody,
    LightboxCloseIcon,
    LightboxCloseTrigger,
    LightboxContent,
    LightboxDescription,
    LightboxFooter,
    LightboxGallery,
    LightboxHeader,
    LightboxImage,
    LightboxPositioner,
    LightboxTitle,
    LightboxTrigger,
  } from '@/components/lightbox';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    backdrop: null,
    positioner: null,
    content: null,
    title: null,
    description: null,
    closeTrigger: null,
    gallery: null,
    header: null,
    body: null,
    footer: null,
    closeIcon: null,
  });

  let imageRef: HTMLImageElement | null = $state(null);

  export const getRefs = () => ({ ...refs, image: imageRef });
</script>

<Lightbox defaultOpen portalled={false}>
  <LightboxTrigger bind:ref={refs.trigger}>Open preview</LightboxTrigger>
  <LightboxBackdrop bind:ref={refs.backdrop} />
  <LightboxPositioner bind:ref={refs.positioner}>
    <LightboxContent bind:ref={refs.content} aria-label="Image preview">
      <LightboxCloseIcon bind:ref={refs.closeIcon} />
      <LightboxHeader bind:ref={refs.header}>
        <LightboxTitle bind:ref={refs.title}>Preview</LightboxTitle>
        <LightboxDescription bind:ref={refs.description}>Description</LightboxDescription>
      </LightboxHeader>
      <LightboxBody bind:ref={refs.body}>
        <LightboxImage bind:ref={imageRef} src="/full-size.jpg" alt="Mountain ridge" />
        <LightboxGallery bind:ref={refs.gallery} />
      </LightboxBody>
      <LightboxFooter bind:ref={refs.footer} />
      <LightboxCloseTrigger bind:ref={refs.closeTrigger}>Close</LightboxCloseTrigger>
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>