<script setup lang="ts">
import { ColorPickerTrigger as ArkColorPickerTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';
import ColorPickerValueSwatch from './ColorPickerValueSwatch.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="color-picker-trigger"
  >
    <slot>
      <ColorPickerValueSwatch />
    </slot>
  </ArkColorPickerTrigger>
</template>