<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Spinner } from '@moduix/vue/spinner';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '@/components/examples/spinner/spinner-button.module.css';

const saving = ref(false);
const toggleSaving = () => (saving.value = !saving.value);
</script>

<template>
  <Stack align="center" gap="3">
    <Button :aria-busy="saving" type="button" @click="toggleSaving">
      <template v-if="saving">
        <Spinner decorative size="sm" />
        Saving changes
      </template>
      <template v-else>Save changes</template>
    </Button>
    <div data-preview-meta :class="styles.meta">
      <output>State: {{ saving ? 'Saving' : 'Ready' }}</output>
    </div>
  </Stack>
</template>