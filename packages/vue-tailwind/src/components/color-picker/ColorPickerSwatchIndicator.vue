<script setup lang="ts">
import { ColorPickerSwatchIndicator as ArkColorPickerSwatchIndicator } from '@ark-ui/vue/color-picker';
import type { ColorPickerSwatchIndicatorProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerSwatchIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerSwatchIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] data-[state=checked]:inline-flex [&>svg]:size-4',
        className,
      )
    "
    data-slot="color-picker-swatch-indicator"
  >
    <slot>
      <CheckIcon />
    </slot>
  </ArkColorPickerSwatchIndicator>
</template>