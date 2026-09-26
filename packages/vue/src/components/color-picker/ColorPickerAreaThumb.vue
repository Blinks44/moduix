<script setup lang="ts">
import { ColorPickerAreaThumb as ArkColorPickerAreaThumb } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaThumbProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerAreaThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerAreaThumb
    v-bind="attrs"
    :class="clsx(styles.thumb, className)"
    data-slot="color-picker-area-thumb"
  />
</template>