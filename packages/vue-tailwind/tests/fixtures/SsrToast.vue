<script setup lang="ts">
import type { CreateToasterReturn } from '@ark-ui/vue/toast';
import type { VNodeChild } from 'vue';
import { ToastToaster } from '../../src/components/toast';
defineProps<{ toaster: CreateToasterReturn<VNodeChild> }>();
</script>
<template>
  <ToastToaster :toaster="toaster" :portalled="false" />
</template>