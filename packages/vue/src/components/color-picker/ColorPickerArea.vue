<script setup lang="ts">
import { ColorPickerArea as ArkColorPickerArea } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';
import ColorPickerAreaBackground from './ColorPickerAreaBackground.vue';
import ColorPickerAreaThumb from './ColorPickerAreaThumb.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerArea
    v-bind="attrs"
    :class="clsx(styles.area, className)"
    data-slot="color-picker-area"
  >
    <slot>
      <ColorPickerAreaBackground />
      <ColorPickerAreaThumb />
    </slot>
  </ArkColorPickerArea>
</template>