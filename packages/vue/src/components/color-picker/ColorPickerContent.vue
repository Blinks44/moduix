<script setup lang="ts">
import { ColorPickerContent as ArkColorPickerContent } from '@ark-ui/vue/color-picker';
import type { ColorPickerContentProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="color-picker-content"
  >
    <slot />
  </ArkColorPickerContent>
</template>