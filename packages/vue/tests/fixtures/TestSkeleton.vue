<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Skeleton } from '../../src';

const loading = ref(true);
const rootRef = ref<ComponentPublicInstance | null>(null);
defineExpose({ loading, rootRef });
</script>

<template>
  <Skeleton
    ref="rootRef"
    as-child
    :loading="loading"
    :box-size="48"
    class="hydrated-skeleton"
    :style="[{ width: '60px' }, 'border-radius: 12px']"
  >
    <section aria-label="Profile" data-testid="hydrated-skeleton">
      <strong>Ada Lovelace</strong>
    </section>
  </Skeleton>
</template>