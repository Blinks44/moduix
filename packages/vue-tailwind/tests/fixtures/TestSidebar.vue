<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Sidebar,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarInset,
} from '../../src';

const rootRef = ref<ComponentPublicInstance>();
defineExpose({ rootRef });
</script>

<template>
  <Sidebar ref="rootRef" as-child :style="['color: red', { height: '24rem', width: '800px' }]">
    <section aria-label="Application shell">
      <SidebarPanel>Navigation</SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>Content</SidebarInset>
    </section>
  </Sidebar>
</template>