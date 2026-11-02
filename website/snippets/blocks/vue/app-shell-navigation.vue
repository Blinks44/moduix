<script setup lang="ts">
import styles from './app-shell.module.css';

export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';
defineProps<{ page: AppPage; workspace: string }>();
const emit = defineEmits<{ navigate: [page: AppPage] }>();
const pages: AppPage[] = ['Projects', 'Team', 'Reports', 'Settings'];
</script>

<template>
  <div :class="styles.brand">
    <span :class="styles.brandMark">A</span>
    <div>
      <strong>{{ workspace }}</strong
      ><span>moduix + Vue</span>
    </div>
  </div>
  <nav aria-label="Workspace">
    <p :class="styles.navHeading">Workspace</p>
    <button
      v-for="item in pages"
      :key="item"
      type="button"
      :class="styles.navItem"
      :aria-current="page === item ? 'page' : undefined"
      @click="emit('navigate', item)"
    >
      {{ item }}
    </button>
    <p :class="[styles.navHeading, styles.resources]">Resources</p>
    <a :class="styles.navItem" href="https://moduix.dev/docs/quick-start">Documentation</a>
    <a :class="styles.navItem" href="https://moduix.dev/docs/components">Components</a>
  </nav>
  <div :class="styles.user">
    <span :class="styles.avatar">AL</span>
    <div><strong>Ada Lovelace</strong><span>ada@acme.dev</span></div>
  </div>
</template>