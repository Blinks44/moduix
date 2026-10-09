<script setup lang="ts">
import { ColorPickerFormatSelect as ArkColorPickerFormatSelect } from '@ark-ui/vue/color-picker';
import type { ColorPickerFormatSelectProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerFormatSelectProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span :class="styles.formatSelectControl">
    <ArkColorPickerFormatSelect
      v-bind="attrs"
      :class="clsx(styles.formatSelect, className)"
      data-slot="color-picker-format-select"
    />
    <span aria-hidden="true" :class="styles.formatSelectIndicator">
      <ChevronDownIcon />
    </span>
  </span>
</template>