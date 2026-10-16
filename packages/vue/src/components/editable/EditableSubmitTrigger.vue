<script setup lang="ts">
import { EditableSubmitTrigger as ArkEditableSubmitTrigger } from '@ark-ui/vue/editable';
import type { EditableSubmitTriggerProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableSubmitTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableSubmitTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="editable-submit-trigger"
  >
    <slot><CheckIcon /></slot>
  </ArkEditableSubmitTrigger>
</template>