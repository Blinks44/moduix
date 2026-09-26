<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Dialog.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.closeTrigger, className)"
    data-slot="dialog-close-trigger"
  >
    <slot />
  </ArkDialogCloseTrigger>
</template>