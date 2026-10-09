<script setup lang="ts">
import { RadioGroupItem as ArkRadioGroupItem } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RadioGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemProps {
  class?: HTMLAttributes['class'];
  value: RadioGroupItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :value="value"
    data-slot="radio-group-item"
  >
    <slot />
  </ArkRadioGroupItem>
</template>