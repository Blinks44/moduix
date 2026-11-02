<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
} from '@moduix/vue/drawer';
import { ref } from 'vue';
import type { Page } from '../data';
import { portalRef } from '../portal';
import AppNavigation from './AppNavigation.vue';
defineProps<{ page: Page; workspace: string }>();
const emit = defineEmits<{ navigate: [page: Page] }>();
const menuOpen = ref(false);
const toggleTheme = () => {
  const root = document.documentElement;
  root.dataset.moduixColorScheme = getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark';
};
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <AppNavigation :page="page" :workspace="workspace" @navigate="emit('navigate', $event)" />
    </aside>
    <div class="app-inset">
      <header class="topbar">
        <Button
          class="mobile-menu"
          variant="ghost"
          size="icon-md"
          aria-label="Open navigation"
          @click="menuOpen = true"
          ><span class="icon icon-menu"
        /></Button>
        <nav aria-label="Breadcrumb" class="breadcrumbs">
          <span>Workspace</span><span>/</span><strong>{{ page }}</strong>
        </nav>
        <div class="topbar-actions">
          <Button
            variant="ghost"
            size="icon-md"
            aria-label="Toggle color scheme"
            @click="toggleTheme"
            ><span class="icon icon-sun" /></Button
          ><a class="icon-link" aria-label="GitHub" href="https://github.com/Blinks44/moduix"
            ><span class="icon icon-github"
          /></a>
        </div>
      </header>
      <main><slot /></main>
    </div>
    <Drawer
      :open="menuOpen"
      swipe-direction="start"
      :portal-ref="portalRef"
      @open-change="menuOpen = $event.open"
      ><DrawerBackdrop /><DrawerPositioner
        ><DrawerContent class="mobile-sidebar"
          ><DrawerTitle class="sr-only">Workspace navigation</DrawerTitle
          ><DrawerCloseIcon /><AppNavigation
            :page="page"
            :workspace="workspace"
            @navigate="
              emit('navigate', $event);
              menuOpen = false;
            " /></DrawerContent></DrawerPositioner
    ></Drawer>
  </div>
</template>