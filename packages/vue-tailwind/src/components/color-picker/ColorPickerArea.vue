<script setup lang="ts">
import { ColorPickerArea as ArkColorPickerArea } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
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
    :class="
      cn(
        'h-40 w-full overflow-hidden rounded-md shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] select-none',
        className,
      )
    "
    data-slot="color-picker-area"
  >
    <slot>
      <ColorPickerAreaBackground />
      <ColorPickerAreaThumb />
    </slot>
  </ArkColorPickerArea>
</template>