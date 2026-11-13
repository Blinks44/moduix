<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';
import styles from '@/components/examples/toast/toast-options.module.css';

const types = [
  { type: 'info', title: 'Update available', description: 'Version 2.4 is ready to install.' },
  { type: 'success', title: 'Changes saved', description: 'Your profile was updated.' },
  { type: 'warning', title: 'Storage almost full', description: 'You have used 90% of 5 GB.' },
  { type: 'error', title: 'Upload failed', description: 'The file is larger than 10 MB.' },
] as const;

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const selected = ref<(typeof types)[number]>(types[1]);
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <div data-preview-meta>
      <output>Type: {{ selected.type }}</output>
      <Button
        v-for="item in types"
        :key="item.type"
        :variant="item.type === selected.type ? 'default' : 'outline'"
        @click="selected = item"
      >
        {{ item.type }}
      </Button>
      <Button @click="toaster.create(selected)">Show toast</Button>
    </div>
  </div>
</template>