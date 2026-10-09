<script setup lang="ts">
import { Frame } from '@ark-ui/vue';
import { ref } from 'vue';
const frame = ref<{ frameRef: HTMLIFrameElement | null } | null>(null);
const handleMount = () => {
  const frameDocument = frame.value?.frameRef?.contentDocument;
  if (!frameDocument) return;
  const script = frameDocument.createElement('script');
  script.textContent = 'document.body.dataset.ready = "true";';
  frameDocument.body.append(script);
};
const handleUnmount = () => {
  // Release application-owned listeners and other resources here.
};
</script>
<template>
  <Frame ref="frame" title="Interactive preview" @mount="handleMount" @unmount="handleUnmount">
    <main>Interactive preview</main>
  </Frame>
</template>