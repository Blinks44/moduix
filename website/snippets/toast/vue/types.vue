<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-types.module.css';

const types = ['info', 'success', 'warning', 'error'] as const;
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button
      v-for="type in types"
      :key="type"
      @click="
        toaster.create({
          title: type === 'info' ? 'Update available' : `${type} toast`,
          description: `This notification uses the ${type} status style.`,
          type,
        })
      "
    >
      {{ type }}
    </Button>
  </div>
</template>