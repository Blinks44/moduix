<script setup lang="ts">
import { DialogContent as ArkDialogContent } from '@ark-ui/vue/dialog';
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Dialog.module.css';

defineOptions({ inheritAttrs: false });

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogPlacement = 'center' | 'top' | 'bottom';
export type DialogScrollBehavior = 'outside' | 'inside';

export interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
  /** Width preset. `full` covers the viewport. */
  size?: DialogSize;
  /** Vertical position inside the positioner. */
  placement?: DialogPlacement;
  /** `outside` scrolls the positioner; `inside` caps the content and scrolls `DialogBody`. */
  scrollBehavior?: DialogScrollBehavior;
}

const {
  class: className,
  placement = 'center',
  scrollBehavior = 'outside',
  size = 'md',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :data-size="size"
    :data-placement="placement"
    :data-scroll-behavior="scrollBehavior"
    data-slot="dialog-content"
  >
    <slot />
  </ArkDialogContent>
</template>