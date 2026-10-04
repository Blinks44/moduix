<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger, useDialogContext } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DialogCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const dialog = useDialogContext();
const closeState = computed(() => (dialog.value.open ? 'open' : 'closed'));
</script>

<template>
  <ArkDialogCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? a11yLabels.closeImage"
      :aria-labelledby="ariaLabelledby"
      :class="clsx(styles.closeIcon, className)"
      :data-state="closeState"
      data-slot="lightbox-close-icon"
    >
      <slot v-if="slots.default" />
    </CloseButton>
  </ArkDialogCloseTrigger>
</template>