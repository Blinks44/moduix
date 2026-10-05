<script setup lang="ts">
import {
  Lightbox,
  LightboxPositioner,
  LightboxContent,
  LightboxTitle,
  LightboxImage,
} from '../../src/components/lightbox';
</script>
<template>
  <Lightbox default-open :portalled="false">
    <LightboxPositioner>
      <LightboxContent aria-label="Image preview">
        <LightboxTitle>Preview</LightboxTitle>
        <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>