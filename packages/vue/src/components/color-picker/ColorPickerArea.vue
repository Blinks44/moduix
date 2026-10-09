<script setup lang="ts">
import {
  ColorPickerArea as ArkColorPickerArea,
  ColorPickerAreaBackground as ArkColorPickerAreaBackground,
  ColorPickerAreaThumb as ArkColorPickerAreaThumb,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

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
      <ArkColorPickerAreaBackground
        data-slot="color-picker-area-background"
        :class="styles.areaBackground"
      />
      <ArkColorPickerAreaThumb data-slot="color-picker-area-thumb" :class="styles.thumb" />
    </slot>
  </ArkColorPickerArea>
</template>