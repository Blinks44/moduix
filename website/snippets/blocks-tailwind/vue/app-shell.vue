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
  <div
    ref="rootRef"
    class="@container/app-shell isolate min-h-dvh w-full bg-card font-sans text-sm text-foreground data-[moduix-color-scheme=dark]:[color-scheme:dark] data-[moduix-color-scheme=light]:[color-scheme:light]"
    :data-moduix-color-scheme="colorScheme"
  >
    <Drawer
      :open="menuOpen"
      swipe-direction="start"
      :portal-ref="() => rootRef"
      @open-change="menuOpen = $event.open"
    >
      <div
        class="grid min-h-[inherit] grid-cols-[minmax(0,1fr)] @min-[48rem]/app-shell:grid-cols-[15rem_minmax(0,1fr)]"
      >
        <aside
          class="hidden flex-col border-e border-border bg-background px-3 py-4 @min-[48rem]/app-shell:flex"
        >
          <AppShellNavigation
            :page="page"
            :workspace="workspace"
            @navigate="emit('navigate', $event)"
          />
        </aside>
        <div class="min-w-0">
          <header
            class="flex min-h-14 items-center justify-between gap-3 border-b border-border px-4 py-2.5 @min-[48rem]/app-shell:ps-8 @min-[48rem]/app-shell:pe-6"
          >
            <DrawerTrigger as-child>
              <Button
                class="inline-flex @min-[48rem]/app-shell:hidden"
                variant="ghost"
                size="icon-md"
                aria-label="Open navigation"
              >
                <svg
                  class="size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="2.667" y1="3.333" x2="13.333" y2="3.333" />
                  <line x1="2.667" y1="8" x2="13.333" y2="8" />
                  <line x1="2.667" y1="12.667" x2="13.333" y2="12.667" />
                </svg>
              </Button>
            </DrawerTrigger>
            <nav
              aria-label="Breadcrumb"
              class="me-auto flex flex-wrap items-center gap-2 text-muted-foreground @min-[48rem]/app-shell:me-0 [&_strong]:font-medium [&_strong]:text-foreground"
            >
              <span>Workspace</span><span aria-hidden="true">/</span
              ><strong aria-current="page">{{ page }}</strong>
            </nav>
            <div class="flex gap-1">
              <Button
                variant="ghost"
                size="icon-md"
                aria-label="Toggle color scheme"
                @click="toggleColorScheme"
              >
                <svg
                  class="size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="2.667" />
                  <line x1="8" y1="1.333" x2="8" y2="2.667" />
                  <line x1="8" y1="13.333" x2="8" y2="14.667" />
                  <line x1="3.287" y1="3.287" x2="4.227" y2="4.227" />
                  <line x1="11.773" y1="11.773" x2="12.713" y2="12.713" />
                  <line x1="1.333" y1="8" x2="2.667" y2="8" />
                  <line x1="13.333" y1="8" x2="14.667" y2="8" />
                  <line x1="4.227" y1="11.773" x2="3.287" y2="12.713" />
                  <line x1="12.713" y1="3.287" x2="11.773" y2="4.227" />
                </svg>
              </Button>
              <a
                class="grid size-control-md flex-none place-items-center rounded-md text-inherit hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                aria-label="GitHub"
                href="https://github.com/Blinks44/moduix"
              >
                <svg class="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path
                    d="M8 .198C3.58.198 0 3.78 0 8.198c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.728 16 11.728 16 8.198 16 3.78 12.418.198 8 .198Z"
                  />
                </svg>
              </a>
            </div>
          </header>
          <main class="px-4 py-6 @min-[48rem]/app-shell:p-8"><slot /></main>
        </div>
      </div>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent
          class="flex w-[min(17rem,100%)] flex-col bg-background px-3 py-4 [&>[data-slot=drawer-close-icon]]:absolute [&>[data-slot=drawer-close-icon]]:end-3 [&>[data-slot=drawer-close-icon]]:top-3"
        >
          <DrawerTitle class="sr-only">Workspace navigation</DrawerTitle>
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