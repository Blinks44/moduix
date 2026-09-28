<script setup lang="ts">
import { DialogContent as ArkDialogContent } from '@ark-ui/vue/dialog';
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDialogContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="lightbox-content"
  >
    <slot />
  </ArkDialogContent>
</template>