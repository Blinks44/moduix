<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import AppShellNavigation from './app-shell-navigation.vue';
import type { AppPage } from './app-shell-navigation.vue';
import styles from './app-shell.module.css';

withDefaults(defineProps<{ page: AppPage; workspace?: string }>(), { workspace: 'Acme Projects' });
const emit = defineEmits<{ navigate: [page: AppPage] }>();
const rootRef = ref<HTMLDivElement | null>(null);
const menuOpen = ref(false);
const colorScheme = ref<'light' | 'dark'>();
function toggleColorScheme() {
  if (rootRef.value) {
    colorScheme.value = getComputedStyle(rootRef.value).colorScheme === 'dark' ? 'light' : 'dark';
  }
}
</script>

<template>
  <div ref="rootRef" :class="styles.root" :data-moduix-color-scheme="colorScheme">
    <Drawer
      :open="menuOpen"
      swipe-direction="start"
      :portal-ref="() => rootRef"
      @open-change="menuOpen = $event.open"
    >
      <div :class="styles.layout">
        <aside :class="styles.sidebar">
          <AppShellNavigation
            :page="page"
            :workspace="workspace"
            @navigate="emit('navigate', $event)"
          />
        </aside>
        <div :class="styles.inset">
          <header :class="styles.topbar">
            <DrawerTrigger as-child>
              <Button
                :class="styles.mobileMenu"
                variant="ghost"
                size="icon-md"
                aria-label="Open navigation"
              >
                <span :class="[styles.icon, styles.menuIcon]" aria-hidden="true" />
              </Button>
            </DrawerTrigger>
            <nav aria-label="Breadcrumb" :class="styles.breadcrumbs">
              <span>Workspace</span><span aria-hidden="true">/</span
              ><strong aria-current="page">{{ page }}</strong>
            </nav>
            <div :class="styles.actions">
              <Button
                variant="ghost"
                size="icon-md"
                aria-label="Toggle color scheme"
                @click="toggleColorScheme"
              >
                <span :class="[styles.icon, styles.sunIcon]" aria-hidden="true" />
              </Button>
              <a
                :class="styles.iconLink"
                aria-label="GitHub"
                href="https://github.com/Blinks44/moduix"
              >
                <span :class="[styles.icon, styles.githubIcon]" aria-hidden="true" />
              </a>
            </div>
          </header>
          <main :class="styles.content"><slot /></main>
        </div>
      </div>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent :class="styles.mobileSidebar">
          <DrawerTitle :class="styles.srOnly">Workspace navigation</DrawerTitle>
          <DrawerCloseIcon />
          <AppShellNavigation
            :page="page"
            :workspace="workspace"
            @navigate="
              emit('navigate', $event);
              menuOpen = false;
            "
          />
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  </div>
</template>