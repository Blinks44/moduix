<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Dialog.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ Omit<DialogCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close dialog');
</script>

<template>
  <ArkDialogCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="closeLabel"
      :class="clsx(styles.closeIcon, className)"
      data-slot="dialog-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkDialogCloseTrigger>
</template>