<script setup lang="ts">
import { ColorPickerEyeDropperTrigger as ArkColorPickerEyeDropperTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerEyeDropperTriggerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { PipetteIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerEyeDropperTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerEyeDropperTrigger
    v-bind="attrs"
    :class="clsx(styles.eyeDropperTrigger, className)"
    data-slot="color-picker-eye-dropper-trigger"
  >
    <slot>
      <PipetteIcon />
    </slot>
  </ArkColorPickerEyeDropperTrigger>
</template>