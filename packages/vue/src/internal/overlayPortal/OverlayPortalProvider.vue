<script setup lang="ts">
import { provide } from 'vue';
import { OverlayPortalContextKey, type OverlayPortalProps } from './context';

const { portalled = true, portalRef } = defineProps<OverlayPortalProps>();

provide(OverlayPortalContextKey, {
  portalled: () => portalled,
  portalRef: () => portalRef,
});
</script>

<template>
  <slot />
</template>