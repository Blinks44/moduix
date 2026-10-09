<script setup lang="ts">
import { DialogDescription as ArkDialogDescription } from '@ark-ui/vue/dialog';
import type { DialogDescriptionProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDialogDescription
    v-bind="attrs"
    :class="clsx(styles.description, className)"
    data-slot="lightbox-description"
  >
    <slot />
  </ArkDialogDescription>
</template>