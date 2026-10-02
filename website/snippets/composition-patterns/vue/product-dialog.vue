<script setup lang="ts">
import { DialogContent as ModuixDialogContent, type DialogContentProps } from '@moduix/vue/dialog';
import type { HTMLAttributes } from 'vue';
import styles from '@/components/examples/composition-patterns/product-dialog.module.css';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ DialogContentProps {
  tone?: 'default' | 'danger';
  class?: HTMLAttributes['class'];
}
const { tone = 'default', class: className } = defineProps<Props>();
</script>
<template>
  <ModuixDialogContent
    v-bind="$attrs"
    :data-dialog-tone="tone"
    :class="[styles.content, className]"
  >
    <slot />
  </ModuixDialogContent>
</template>