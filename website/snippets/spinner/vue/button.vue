<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Spinner } from '@moduix/vue/spinner';
import { ref } from 'vue';

const saving = ref(false);
const toggleSaving = () => (saving.value = !saving.value);
</script>

<template>
  <Button :aria-busy="saving" type="button" @click="toggleSaving">
    <template v-if="saving">
      <Spinner decorative size="sm" />
      Saving changes
    </template>
    <template v-else>Save changes</template>
  </Button>
  <output>State: {{ saving ? 'Saving' : 'Ready' }}</output>
</template>