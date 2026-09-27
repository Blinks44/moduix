<script setup lang="ts">
import { RadioGroupItemControl as ArkRadioGroupItemControl } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemControlProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { RadioGroupItemControlSize } from './radio-group.types';
import styles from './RadioGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemControlProps {
  class?: HTMLAttributes['class'];
  size?: RadioGroupItemControlSize;
}

const { class: className, size = 'md' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupItemControl
    v-bind="attrs"
    :class="clsx(styles.itemControl, className)"
    :data-size="size"
    data-slot="radio-group-item-control"
  >
    <slot />
  </ArkRadioGroupItemControl>
</template>