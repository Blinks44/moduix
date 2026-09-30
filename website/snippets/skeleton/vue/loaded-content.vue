<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Skeleton } from '@moduix/vue/skeleton';
import { ref } from 'vue';
import styles from '@/components/examples/skeleton/skeleton-loaded-content.module.css';

const profile = { name: 'Ada Lovelace', role: 'Analytical engine notes' };
const loading = ref(true);
</script>

<template>
  <section aria-label="Profile" :aria-busy="loading" :class="styles.root">
    <Skeleton :loading="loading" :class="styles.skeleton">
      <strong>{{ profile.name }}</strong>
      <span :class="styles.role">{{ profile.role }}</span>
    </Skeleton>
    <div>
      <output>Profile: {{ loading ? 'loading' : 'loaded' }}</output>
      <Button size="sm" type="button" @click="loading = !loading">
        {{ loading ? 'Show profile' : 'Show skeleton' }}
      </Button>
    </div>
  </section>
</template>