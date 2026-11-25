<script setup lang="ts">
import type { Page } from '../data';
defineProps<{ page: Page; workspace: string }>();
const emit = defineEmits<{ navigate: [page: Page] }>();
const pages: Page[] = ['Projects', 'Team', 'Reports', 'Settings'];
const navItemClass =
  'mb-0.5 block min-h-8 w-full cursor-pointer rounded-lg border border-transparent px-[11px] py-[5px] text-left text-muted-foreground no-underline hover:bg-muted aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring';
</script>

<template>
  <div class="mb-0.5 flex items-center gap-2.5 px-2 pt-1 pb-5">
    <span class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
      A
    </span>
    <div>
      <strong class="block text-sm font-semibold">{{ workspace }}</strong>
      <span class="block text-xs leading-[17px] text-muted-foreground"
        >moduix + Vue + Tailwind</span
      >
    </div>
  </div>
  <nav aria-label="Workspace">
    <p class="mb-0.5 px-3 py-1 text-xs leading-5 font-semibold text-muted-foreground">Workspace</p>
    <button
      v-for="item in pages"
      :key="item"
      :class="navItemClass"
      :aria-current="page === item ? 'page' : undefined"
      @click="emit('navigate', item)"
    >
      {{ item }}
    </button>
    <p class="mt-5 mb-0.5 px-3 py-1 text-xs leading-5 font-semibold text-muted-foreground">
      Resources
    </p>
    <a :class="navItemClass" href="https://moduix.dev/docs/quick-start">Documentation</a>
    <a :class="navItemClass" href="https://moduix.dev/docs/components">Components</a>
  </nav>
  <div class="mt-auto flex items-center gap-2.5 p-2">
    <span
      class="inline-grid size-8 shrink-0 place-items-center rounded-full bg-border text-xs text-foreground"
    >
      AL
    </span>
    <div>
      <strong class="block text-sm font-semibold">Ada Lovelace</strong>
      <span class="block text-xs leading-[17px] text-muted-foreground">ada@acme.dev</span>
    </div>
  </div>
</template>