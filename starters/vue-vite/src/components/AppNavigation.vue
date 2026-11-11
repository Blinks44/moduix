<script setup lang="ts">
import type { Page } from '../data';
defineProps<{ page: Page; workspace: string }>();
const emit = defineEmits<{ navigate: [page: Page] }>();
const pages: Page[] = ['Projects', 'Team', 'Reports', 'Settings'];
</script>

<template>
  <div class="brand">
    <span class="brand-mark">A</span>
    <div><strong>{{ workspace }}</strong><span>moduix + Vue</span></div>
  </div>
  <nav aria-label="Workspace">
    <p class="nav-heading">Workspace</p>
    <button
      v-for="item in pages"
      :key="item"
      class="nav-item"
      :aria-current="page === item ? 'page' : undefined"
      @click="emit('navigate', item)"
    >
      {{ item }}
    </button>
    <p class="nav-heading resources">Resources</p>
    <a class="nav-item" href="https://moduix.dev/docs/quick-start">Documentation</a
    ><a class="nav-item" href="https://moduix.dev/docs/components">Components</a>
  </nav>
  <div class="user">
    <span class="avatar">AL</span>
    <div><strong>Ada Lovelace</strong><span>ada@acme.dev</span></div>
  </div>
</template>