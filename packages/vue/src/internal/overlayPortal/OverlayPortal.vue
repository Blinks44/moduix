<script setup lang="ts">
import { computed, inject, toValue } from 'vue';
import { defaultOverlayPortalContext, OverlayPortalContextKey } from './context';

const context = inject(OverlayPortalContextKey, defaultOverlayPortalContext);

const target = computed(() => toValue(context.portalRef()) ?? 'body');

const portalled = computed(() => context.portalled() !== false);
</script>

<template>
  <slot v-if="!portalled" />
  <Teleport v-else :to="target">
    <slot />
  </Teleport>
</template>