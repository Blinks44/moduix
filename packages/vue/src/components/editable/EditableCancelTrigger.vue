<script setup lang="ts">
import { EditableCancelTrigger as ArkEditableCancelTrigger } from '@ark-ui/vue/editable';
import type { EditableCancelTriggerProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableCancelTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableCancelTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="editable-cancel-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkEditableCancelTrigger>
</template>