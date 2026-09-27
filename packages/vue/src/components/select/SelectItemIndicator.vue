<script setup lang="ts">
import { SelectItemIndicator as ArkSelectItemIndicator } from '@ark-ui/vue/select';
import type { SelectItemIndicatorProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemIndicator
    v-bind="attrs"
    :class="clsx(styles.itemIndicator, className)"
    data-slot="select-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkSelectItemIndicator>
</template>