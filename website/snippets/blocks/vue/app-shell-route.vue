<script setup lang="ts">
import { ref } from 'vue';
import type { AppPage } from './app-shell-navigation.vue';
import AppShell from './app-shell.vue';

const page = ref<AppPage>('Projects');
</script>

<template>
  <AppShell :page="page" @navigate="page = $event">
    <h1>{{ page }}</h1>
    <p>Your workspace content goes here.</p>
  </AppShell>
</template>