<script setup lang="ts">
import { ColorPickerChannelSliderThumb as ArkColorPickerChannelSliderThumb } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderThumbProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSliderThumb
    v-bind="attrs"
    :class="
      cn(
        'size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,black_18%,transparent),var(--moduix-shadow-sm)] ring-2 ring-background outline-0 focus-visible:shadow-[0_0_0_4px_var(--color-ring),var(--moduix-shadow-sm)]',
        className,
      )
    "
    data-slot="color-picker-channel-slider-thumb"
  />
</template>