<script setup lang="ts">
import { DialogBackdrop as ArkDialogBackdrop } from '@ark-ui/vue/dialog';
import type { DialogBackdropProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import styles from './Dialog.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogBackdropProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDialogBackdrop
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.backdrop, className)"
      data-slot="dialog-backdrop"
    >
      <slot />
    </ArkDialogBackdrop>
  </OverlayPortal>
</template>