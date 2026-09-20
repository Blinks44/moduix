<script setup lang="ts">
import { computed, inject } from 'vue';
import { defaultOverlayPortalContext, OverlayPortalContextKey } from './context';

const context = inject(OverlayPortalContextKey, defaultOverlayPortalContext);

const target = computed(() => {
  const portalRef = context.portalRef();
  return (typeof portalRef === 'function' ? portalRef() : portalRef) ?? 'body';
});

const portalled = computed(() => context.portalled() !== false);
</script>

<template>
  <slot v-if="!portalled" />
  <Teleport v-else :to="target">
    <slot />
  </Teleport>
</template>