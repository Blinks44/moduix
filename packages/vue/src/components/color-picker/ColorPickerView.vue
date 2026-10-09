<script setup lang="ts">
import { ColorPickerView as ArkColorPickerView } from '@ark-ui/vue/color-picker';
import type { ColorPickerViewProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerViewProps {
  class?: HTMLAttributes['class'];
  format: ColorPickerViewProps['format'];
}

const { class: className, format } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerView
    v-bind="attrs"
    :class="clsx(styles.view, className)"
    :format="format"
    data-slot="color-picker-view"
  >
    <slot />
  </ArkColorPickerView>
</template>