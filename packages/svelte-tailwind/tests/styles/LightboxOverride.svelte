<script lang="ts">
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxCloseIcon,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
  } from '@/components/lightbox';
</script>

<Lightbox defaultOpen portalled={false}>
  <LightboxBackdrop class="bg-red-500" />
  <LightboxPositioner class="p-8">
    <LightboxContent class="max-w-full" aria-label="Image preview">
      <LightboxCloseIcon class="size-10" />
      <LightboxImage class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>