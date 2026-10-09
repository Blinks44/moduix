<script setup lang="ts">
import { SelectIndicator as ArkSelectIndicator } from '@ark-ui/vue/select';
import type { SelectIndicatorProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="select-indicator"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkSelectIndicator>
</template>