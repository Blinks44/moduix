<script setup lang="ts">
import { ColorPickerAreaBackground as ArkColorPickerAreaBackground } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaBackgroundProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerAreaBackgroundProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerAreaBackground
    v-bind="attrs"
    :class="clsx(styles.areaBackground, className)"
    data-slot="color-picker-area-background"
  />
</template>